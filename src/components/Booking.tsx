import { useEffect, useState } from 'react'
import {
  createBooking,
  getAvailableTimes,
} from '../api/bookings'
import {
  getServices,
  type Service,
} from '../api/services'

function Booking() {
  const [services, setServices] = useState<Service[]>([])
  const [serviceId, setServiceId] = useState('')
  const [clientName, setClientName] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [date, setDate] = useState('')
  const [time, setTime] = useState('')
  const [notes, setNotes] = useState('')
  const [message, setMessage] = useState('')
  const [availableTimes, setAvailableTimes] = useState<string[]>([])

  const selectedService = services.find(
    (service) => service.id === serviceId
  )

  useEffect(() => {
    getServices()
      .then((result) => {
        const activeServices = result.data.filter(
          (service) => service.isActive
        )

        setServices(activeServices)

        if (activeServices.length > 0) {
          setServiceId(activeServices[0].id)
        }
      })
      .catch(console.error)
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
        console.error(error)
        setAvailableTimes([])
        setTime('')
      })
  }, [date, serviceId])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    try {
      await createBooking({
        clientName,
        phone,
        email,
        date,
        time,
        notes,
        serviceId,
      })

      setMessage('Programarea a fost trimisă cu succes!')

      setClientName('')
      setPhone('')
      setEmail('')
      setDate('')
      setTime('')
      setNotes('')
    } catch (error) {
      setMessage(
        error instanceof Error
          ? error.message
          : 'A apărut o eroare.'
      )
    }
  }

  return (
    <section id="booking" className="booking">
      <div className="bookingInfo">
        <span>PROGRAMARE ONLINE</span>

        <h2>
          Programare masaj în Chișinău
        </h2>

        <p>
          Alege serviciul de masaj dorit, data și ora disponibilă.
          Programarea ta va fi înregistrată imediat la MaryGold by Ana Massage.
        </p>
      </div>

      <form className="bookingForm" onSubmit={handleSubmit}>
        <label htmlFor="service">
          Serviciul de masaj
        </label>

        <select
          id="service"
          value={serviceId}
          onChange={(e) => setServiceId(e.target.value)}
          required
        >
          {services.map((service) => (
            <option
              key={service.id}
              value={service.id}
            >
              {service.name} — {service.duration} min — {service.price} lei
            </option>
          ))}
        </select>

        {selectedService && (
          <div className="selectedServiceCard">
            <h3>{selectedService.name}</h3>

            {selectedService.category && (
              <p>
                <strong>Categorie:</strong>{' '}
                {selectedService.category}
              </p>
            )}

            <p>
              <strong>Durată:</strong>{' '}
              {selectedService.duration} minute
            </p>

            <p>
              <strong>Preț:</strong>{' '}
              {selectedService.price} lei
            </p>

            {selectedService.description && (
              <p>{selectedService.description}</p>
            )}
          </div>
        )}

        <div className="formGrid">
          <div>
            <label htmlFor="booking-date">
              Data
            </label>

            <input
              id="booking-date"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
            />
          </div>

          <div>
            <label htmlFor="booking-phone">
              Telefon
            </label>

            <input
              id="booking-phone"
              type="tel"
              placeholder="+373 ..."
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
          </div>
        </div>

        <label>Ora disponibilă</label>

        <div className="timeGrid">
          {availableTimes.map((hour) => (
            <button
              key={hour}
              type="button"
              className={time === hour ? 'timeActive' : ''}
              onClick={() => setTime(hour)}
            >
              {hour}
            </button>
          ))}
        </div>

        <label htmlFor="booking-name">
          Nume
        </label>

        <input
          id="booking-name"
          type="text"
          placeholder="Numele tău"
          value={clientName}
          onChange={(e) => setClientName(e.target.value)}
          required
        />

        <label htmlFor="booking-email">
          Email
        </label>

        <input
          id="booking-email"
          type="email"
          placeholder="Email pentru confirmare"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label htmlFor="booking-notes">
          Mesaj
        </label>

        <textarea
          id="booking-notes"
          placeholder="Mesaj opțional..."
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
        />

        {message && (
          <p className="formMessage">
            {message}
          </p>
        )}

        <button
          className="submitBtn"
          type="submit"
          disabled={!time}
        >
          Programează-te la masaj
        </button>
      </form>
    </section>
  )
}

export default Booking