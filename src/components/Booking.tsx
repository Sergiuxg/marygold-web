import { useEffect, useState } from 'react'
import { createBooking, getAvailableTimes } from '../api/bookings'
import { getServices, type Service } from '../api/services'


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
const selectedService = services.find((service) => service.id === serviceId)
  useEffect(() => {
  getServices().then((result) => {
    setServices(result.data)

    if (result.data.length > 0) {
      setServiceId(result.data[0].id)
    }
  })
}, [])

useEffect(() => {
  if (!date || !serviceId) {
    setAvailableTimes([])
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
      setMessage(error instanceof Error ? error.message : 'A apărut o eroare.')
    }
  }

  return (
    <section id="booking" className="booking">
      <div className="bookingInfo">
        <span>PROGRAMARE ONLINE</span>
        <h2>Rezervă o ședință</h2>
        <p>
          Alege serviciul, data și ora. Programarea va ajunge direct în panoul administratorului.
        </p>
      </div>

      <form className="bookingForm" onSubmit={handleSubmit}>
        <label>Serviciul</label>
        <select value={serviceId} onChange={(e) => setServiceId(e.target.value)}>
  {services.map((service) => (
    <option key={service.id} value={service.id}>
      {service.name} — {service.duration} min — {service.price} lei
    </option>
  ))}
</select>
{selectedService && (
  <div className="selectedServiceCard">
    <h3>{selectedService.name}</h3>

    <p>
      <strong>Categorie:</strong> {selectedService.category}
    </p>

    <p>
      <strong>Durată:</strong> {selectedService.duration} minute
    </p>

    <p>
      <strong>Preț:</strong> {selectedService.price} lei
    </p>

    {selectedService.description && (
      <p>{selectedService.description}</p>
    )}
  </div>
)}
        <div className="formGrid">
          <div>
            <label>Data</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
            />
          </div>

          <div>
            <label>Telefon</label>
            <input
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

        <input
          type="text"
          placeholder="Numele tău"
          value={clientName}
          onChange={(e) => setClientName(e.target.value)}
          required
        />

        <input
          type="email"
          placeholder="Email pentru trimiterea confirmării"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <textarea
          placeholder="Mesaj opțional..."
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
        />

        {message && <p className="formMessage">{message}</p>}

        <button className="submitBtn" type="submit" disabled={!time}>
          Trimite programarea
        </button>
      </form>
    </section>
  )
}

export default Booking