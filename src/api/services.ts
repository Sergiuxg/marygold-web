const API_URL =
  import.meta.env.VITE_API_URL || 'http://localhost:5001/api'
export type Service = {
  id: string
  name: string
  description?: string
  duration: number
  price: number
  category?: string
  imageUrl?: string
  isActive: boolean
  isFeatured: boolean
  createdAt: string
  updatedAt: string
}

export type CreateServiceData = {
  name: string
  description?: string
  duration: number
  price: number
  category?: string
  imageUrl?: string
  isActive?: boolean
  isFeatured?: boolean
}

export type UpdateServiceData = Partial<CreateServiceData>

export type ServicesResponse = {
  data: Service[]
  total: number
  page: number
  limit: number
}

export type GetServicesParams = {
  search?: string
  sortBy?: string
  order?: 'asc' | 'desc'
  page?: number
  limit?: number
}

export async function getServices(
  params: GetServicesParams = {}
): Promise<ServicesResponse> {
  const query = new URLSearchParams()

  if (params.search) query.append('search', params.search)
  if (params.sortBy) query.append('sortBy', params.sortBy)
  if (params.order) query.append('order', params.order)
  if (params.page) query.append('page', String(params.page))
  if (params.limit) query.append('limit', String(params.limit))

  const response = await fetch(
    `${API_URL}/services?${query.toString()}`
  )

  if (!response.ok) {
    throw new Error('Nu s-au putut încărca serviciile.')
  }

  return response.json()
}

export async function createService(data: CreateServiceData) {
  const token = localStorage.getItem('token')

  const response = await fetch(`${API_URL}/services`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  })

  const result = await response.json()

  if (!response.ok) {
    throw new Error(
      result.message || 'Nu s-a putut crea serviciul.'
    )
  }

  return result
}

export async function updateService(
  id: string,
  data: UpdateServiceData
) {
  const token = localStorage.getItem('token')

  const response = await fetch(`${API_URL}/services/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  })

  const result = await response.json()

  if (!response.ok) {
    throw new Error(
      result.message || 'Nu s-a putut actualiza serviciul.'
    )
  }

  return result
}

export async function deleteService(id: string) {
  const token = localStorage.getItem('token')

  const response = await fetch(`${API_URL}/services/${id}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  const result = await response.json()

  if (!response.ok) {
    throw new Error(
      result.message || 'Nu s-a putut șterge serviciul.'
    )
  }

  return result
}