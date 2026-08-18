const API_URL =
  import.meta.env.VITE_API_URL || 'http://localhost:5001/api'
export type Service = {
  id: string
  name: string
  description: string
  duration: number
  price: number
  createdAt: string
  category?: string
}

export type CreateBookingData = {
  clientName: string
  phone: string
  email?: string
  date: string
  time: string
  notes?: string
  serviceId: string
}

export async function getServices(): Promise<Service[]> {
  const response = await fetch(`${API_URL}/services`)

  if (!response.ok) {
    throw new Error('Nu s-au putut încărca serviciile.')
  }

  return response.json()
}

export async function createBooking(data: CreateBookingData) {
  const response = await fetch(`${API_URL}/bookings`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })

  const result = await response.json()

  if (!response.ok) {
    throw new Error(result.message || 'Nu s-a putut crea programarea.')
  }

  return result
}

export async function getAvailableTimes(
  date: string,
  serviceId: string
): Promise<string[]> {
  const response = await fetch(
    `${API_URL}/bookings/available-times?date=${date}&serviceId=${serviceId}`
  )

  if (!response.ok) {
    throw new Error('Nu s-au putut încărca orele disponibile.')
  }

  return response.json()
}