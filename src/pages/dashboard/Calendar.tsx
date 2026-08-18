import { useEffect, useState } from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import type { EventClickArg } from '@fullcalendar/core'

import { getServices, type Service } from '../../api/services'
import {
  createBooking,
  getAvailableTimes,
} from '../../api/bookings'

import {
  getBookings,
  updateBookingStatus,
  type Booking,
} from '../../api/dashboard'

function Calendar() {
  const [bookings, setBookings] = useState<Booking[]>([])
  const [selectedBooking, setSelectedBooking] =
    useState<Booking | null>(null)

  const [services, setServices] = useState<Service[]>([])
  const [showCreateModal, setShowCreateModal] = useState(false)

  const [availableTimes, setAvailableTimes] = useState<string[]>([])

  const [clientName, setClientName] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [serviceId, setServiceId] = useState('')
  const [date, setDate] = useState('')
  const [time, setTime] = useState('')
  const [notes, setNotes] = useState('')
  const [createError, setCreateError] = useState('')

  useEffect(() => {
    loadBookings()
    loadServices()
  }, [])

  useEffect(() => {
    if (!date || !serviceId) {
      setAvailableTimes([])
      setTime('')
      return
    }

    getAvailableTimes(date, serviceId)
      .then((times) => {
        setAvailableTimes(times)
        setTime('')
      })
      .catch((error) => {
        console.error('AVAILABLE TIMES ERROR:', error)
        setAvailableTimes([])
        setTime('')
      })
  }, [date, serviceId])

  async function loadBookings() {
    try {
      const data = await getBookings()
      setBookings(data)
    } catch (error) {
      console.error('BOOKINGS ERROR:', error)
    }
  }

  async function loadServices() {
    try {
      const result = await getServices({
        page: 1,
        limit: 100,
        sortBy: 'name',
        order: 'asc',
      })

      const activeServices = result.data.filter(
        (service) => service.isActive
      )

      setServices(activeServices)

      if (activeServices.length > 0) {
        setServiceId(activeServices[0].id)
      }
    } catch (error) {
      console.error('SERVICES ERROR:', error)
    }
  }

  const events = bookings
    .filter((booking) => booking.status !== 'cancelled')
    .map((booking) => {
      const start = new Date(booking.date)

      const [hours, minutes] = booking.time
        .split(':')
        .map(Number)

      start.setHours(hours, minutes, 0, 0)

      const end = new Date(start)

      end.setMinutes(
        end.getMinutes() + booking.service.duration
      )

      return {
        id: booking.id,
        title: `${booking.clientName} • ${booking.service.name}`,
        start,
        end,

        backgroundColor:
          booking.status === 'confirmed'
            ? '#198754'
            : '#f0ad1f',

        borderColor:
          booking.status === 'confirmed'
            ? '#198754'
            : '#f0ad1f',

        textColor: '#ffffff',
      }
    })

  function handleEventClick(info: EventClickArg) {
    const booking = bookings.find(
      (item) => item.id === info.event.id
    )

    if (booking) {
      setSelectedBooking(booking)
    }
  }

  function resetCreateForm() {
    setClientName('')
    setPhone('')
    setEmail('')
    setDate('')
    setTime('')
    setNotes('')
    setAvailableTimes([])
    setCreateError('')

    if (services.length > 0) {
      setServiceId(services[0].id)
    }
  }

  function closeCreateModal() {
    setShowCreateModal(false)
    resetCreateForm()
  }

  async function handleCreateBooking(
    e: React.FormEvent
  ) {
    e.preventDefault()
    setCreateError('')

    if (!time) {
      setCreateError('Selectați o oră disponibilă.')
      return
    }

    try {
      await createBooking({
        clientName,
        phone,
        email,
        serviceId,
        date,
        time,
        notes,
      })

      await loadBookings()

      closeCreateModal()
    } catch (error) {
      setCreateError(
        error instanceof Error
          ? error.message
          : 'Programarea nu a putut fi creată.'
      )

      // Reîncărcăm orele în caz că între timp
      // ora aleasă a devenit ocupată.
      if (date && serviceId) {
        try {
          const times = await getAvailableTimes(
            date,
            serviceId
          )

          setAvailableTimes(times)
          setTime('')
        } catch (availableError) {
          console.error(availableError)
        }
      }
    }
  }

  async function changeStatus(
    id: string,
    status: 'confirmed' | 'cancelled'
  ) {
    try {
      await updateBookingStatus(id, status)

      const updatedBookings = await getBookings()

      setBookings(updatedBookings)

      const updatedBooking = updatedBookings.find(
        (item) => item.id === id
      )

      if (status === 'cancelled') {
        setSelectedBooking(null)
      } else {
        setSelectedBooking(updatedBooking || null)
      }
    } catch (error) {
      console.error('STATUS UPDATE ERROR:', error)
    }
  }

  return (
    <div>
      <div className="calendarPageHeader">
        <h1>Calendar</h1>

        <button
          type="button"
          className="addBookingBtn"
          onClick={() => setShowCreateModal(true)}
        >
          + Adaugă programare
        </button>
      </div>

      <div className="calendarCard">
        <FullCalendar
          plugins={[
            dayGridPlugin,
            timeGridPlugin,
            interactionPlugin,
          ]}
          initialView="dayGridMonth"
          headerToolbar={{
            left: 'prev',
            center: 'title',
            right: 'next',
          }}
          events={events}
          eventClick={handleEventClick}
          height="auto"
          locale="ro"
          slotMinTime="09:00:00"
          slotMaxTime="22:00:00"
          allDaySlot={false}
          eventTimeFormat={{
            hour: '2-digit',
            minute: '2-digit',
            hour12: false,
          }}
        />
      </div>

      {selectedBooking && (
        <div
          className="modalOverlay"
          onClick={() => setSelectedBooking(null)}
        >
          <div
            className="bookingModal"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              className="modalClose"
              onClick={() =>
                setSelectedBooking(null)
              }
            >
              ×
            </button>

            <span
              className={`status ${selectedBooking.status}`}
            >
              {selectedBooking.status}
            </span>

            <h2>{selectedBooking.clientName}</h2>

            <p>
              <strong>Serviciu:</strong>{' '}
              {selectedBooking.service.name}
            </p>

            <p>
              <strong>Telefon:</strong>{' '}
              {selectedBooking.phone}
            </p>

            {selectedBooking.email && (
              <p>
                <strong>Email:</strong>{' '}
                {selectedBooking.email}
              </p>
            )}

            <p>
              <strong>Data:</strong>{' '}
              {new Date(
                selectedBooking.date
              ).toLocaleDateString('ro-RO')}
            </p>

            <p>
              <strong>Ora:</strong>{' '}
              {selectedBooking.time}
            </p>

            <p>
              <strong>Durată:</strong>{' '}
              {selectedBooking.service.duration} min
            </p>

            <p>
              <strong>Preț:</strong>{' '}
              {selectedBooking.service.price} lei
            </p>

            {selectedBooking.notes && (
              <p>
                <strong>Notițe:</strong>{' '}
                {selectedBooking.notes}
              </p>
            )}

            {selectedBooking.status === 'pending' && (
              <div className="bookingActions">
                <button
                  type="button"
                  className="confirmBtn"
                  onClick={() =>
                    changeStatus(
                      selectedBooking.id,
                      'confirmed'
                    )
                  }
                >
                  Confirmă
                </button>

                <button
                  type="button"
                  className="cancelBtn"
                  onClick={() =>
                    changeStatus(
                      selectedBooking.id,
                      'cancelled'
                    )
                  }
                >
                  Anulează
                </button>
              </div>
            )}

            {selectedBooking.status === 'confirmed' && (
              <div className="bookingActions">
                <button
                  type="button"
                  className="cancelBtn"
                  onClick={() =>
                    changeStatus(
                      selectedBooking.id,
                      'cancelled'
                    )
                  }
                >
                  Anulează programarea
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {showCreateModal && (
        <div
          className="modalOverlay"
          onClick={closeCreateModal}
        >
          <form
            className="bookingModal createBookingModal"
            onSubmit={handleCreateBooking}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              className="modalClose"
              onClick={closeCreateModal}
            >
              ×
            </button>

            <h2>Adaugă programare</h2>

            <input
              type="text"
              placeholder="Numele clientului"
              value={clientName}
              onChange={(e) =>
                setClientName(e.target.value)
              }
              required
            />

            <input
              type="tel"
              placeholder="Telefon"
              value={phone}
              onChange={(e) =>
                setPhone(e.target.value)
              }
              required
            />

            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
            />

            <select
              value={serviceId}
              onChange={(e) =>
                setServiceId(e.target.value)
              }
              required
            >
              <option value="">
                Selectează serviciul
              </option>

              {services.map((service) => (
                <option
                  key={service.id}
                  value={service.id}
                >
                  {service.name} —{' '}
                  {service.duration} min —{' '}
                  {service.price} lei
                </option>
              ))}
            </select>

            <div className="formGrid">
              <input
                type="date"
                value={date}
                onChange={(e) =>
                  setDate(e.target.value)
                }
                required
              />

              <select
                value={time}
                onChange={(e) =>
                  setTime(e.target.value)
                }
                required
                disabled={
                  !date ||
                  !serviceId ||
                  availableTimes.length === 0
                }
              >
                <option value="">
                  {!date || !serviceId
                    ? 'Selectează data'
                    : availableTimes.length === 0
                      ? 'Nu sunt ore disponibile'
                      : 'Selectează ora'}
                </option>

                {availableTimes.map(
                  (availableTime) => (
                    <option
                      key={availableTime}
                      value={availableTime}
                    >
                      {availableTime}
                    </option>
                  )
                )}
              </select>
            </div>

            {date &&
              serviceId &&
              availableTimes.length === 0 && (
                <p className="formMessage">
                  Nu există intervale disponibile
                  pentru această zi și acest serviciu.
                </p>
              )}

            <textarea
              placeholder="Notițe"
              value={notes}
              onChange={(e) =>
                setNotes(e.target.value)
              }
            />

            {createError && (
              <p className="formMessage">
                {createError}
              </p>
            )}

            <button
              type="submit"
              className="submitBtn"
              disabled={
                !clientName ||
                !phone ||
                !serviceId ||
                !date ||
                !time
              }
            >
              Salvează programarea
            </button>
          </form>
        </div>
      )}
    </div>
  )
}

export default Calendar