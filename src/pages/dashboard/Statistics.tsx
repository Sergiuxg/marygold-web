import { useEffect, useState } from 'react'
import {
  Bar,
  BarChart,
  CartesianGrid,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  Cell,
} from 'recharts'
import {
  getAdvancedStatistics,
  type AdvancedStatistics,
} from '../../api/statistics'

function toChartData(data: Record<string, number>, nameKey = 'name') {
  return Object.entries(data).map(([key, value]) => ({
    [nameKey]: key,
    value,
  }))
}

function Statistics() {
  const [stats, setStats] = useState<AdvancedStatistics | null>(null)

  useEffect(() => {
    getAdvancedStatistics().then(setStats).catch(console.error)
  }, [])

  if (!stats) {
    return <h2>Se încarcă statisticile...</h2>
  }

  const revenueByService = toChartData(stats.revenueByService, 'service')
  const popularServices = toChartData(stats.popularServices, 'service')
  const busyHours = toChartData(stats.busyHours, 'hour')
  const bookingsByStatus = toChartData(stats.bookingsByStatus, 'status')

  return (
    <div>
      <h1>Statistici</h1>

      <div className="statsGrid">
        <div className="chartCard">
          <h2>Venit pe servicii</h2>

          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={revenueByService}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="service" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" radius={[10, 10, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="chartCard">
          <h2>Servicii populare</h2>

          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={popularServices}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="service" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" radius={[10, 10, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="chartCard">
          <h2>Ore aglomerate</h2>

          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={busyHours}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="hour" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" radius={[10, 10, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="chartCard">
          <h2>Status programări</h2>

          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={bookingsByStatus}
                dataKey="value"
                nameKey="status"
                outerRadius={100}
                label
              >
                {bookingsByStatus.map((_, index) => (
                  <Cell key={index} />
                ))}
              </Pie>

              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}

export default Statistics