const API_URL =
  import.meta.env.VITE_API_URL || 'http://localhost:5001/api'
export type OverviewStatistics = {
  revenueToday: number
  revenueWeek: number
  revenueMonth: number
  revenueTotal: number
  confirmedBookings: number
}

export async function getOverviewStatistics(): Promise<OverviewStatistics> {
  const response = await fetch(`${API_URL}/statistics/overview`)

  if (!response.ok) {
    throw new Error('Nu s-au putut încărca statisticile.')
  }

  return response.json()
}

export type AdvancedStatistics = {
  revenueByService: Record<string, number>
  bookingsByStatus: Record<string, number>
  popularServices: Record<string, number>
  busyHours: Record<string, number>
}

export async function getAdvancedStatistics(): Promise<AdvancedStatistics> {
  const response = await fetch(`${API_URL}/statistics/advanced`)

  if (!response.ok) {
    throw new Error('Nu s-au putut încărca statisticile avansate.')
  }

  return response.json()
}