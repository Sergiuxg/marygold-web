const API_URL =
  import.meta.env.VITE_API_URL || 'http://localhost:5001/api'
export type BookingStatus = 'pending' | 'confirmed' | 'cancelled'

export type Booking = {
  id: string
  clientName: string
  phone: string
  email?: string
  date: string
  time: string
  status: BookingStatus
  notes?: string
  service: {
    id: string
    name: string
    duration: number
    price: number
  }
}

export async function getBookings(): Promise<Booking[]> {
  const response = await fetch(`${API_URL}/bookings`)

  if (!response.ok) {
    throw new Error('Nu s-au putut încărca programările.')
  }

  return response.json()
}

export async function updateBookingStatus(id: string, status: BookingStatus) {
  const response = await fetch(`${API_URL}/bookings/${id}/status`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ status }),
  })

  const result = await response.json()

  if (!response.ok) {
    throw new Error(result.message || 'Nu s-a putut actualiza programarea.')
  }

  return result
}