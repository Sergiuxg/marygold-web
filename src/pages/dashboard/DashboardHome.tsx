import { useEffect, useState } from 'react'
import {
  CalendarCheck,
  Clock,
  BadgeCheck,
  Wallet,
} from 'lucide-react'
import {
  getOverviewStatistics,
  type OverviewStatistics,
} from '../../api/statistics'

function DashboardHome() {
  const user = JSON.parse(localStorage.getItem('user') || '{}')
  const [stats, setStats] = useState<OverviewStatistics | null>(null)

  useEffect(() => {
    getOverviewStatistics()
      .then((result) => {
        setStats(result)
      })
      .catch((error) => {
        console.error(error)

        setStats({
          revenueToday: 0,
          revenueWeek: 0,
          revenueMonth: 0,
          revenueTotal: 0,
          confirmedBookings: 0,
        })
      })
  }, [])

  if (!stats) {
    return <h2>Se încarcă statisticile...</h2>
  }

  const cards = [
    {
      title: 'Venit astăzi',
      value: `${stats.revenueToday ?? 0} lei`,
      icon: Wallet,
    },
    {
      title: 'Venit săptămână',
      value: `${stats.revenueWeek ?? 0} lei`,
      icon: Clock,
    },
    {
      title: 'Venit lună',
      value: `${stats.revenueMonth ?? 0} lei`,
      icon: CalendarCheck,
    },
    {
      title: 'Programări confirmate',
      value: stats.confirmedBookings ?? 0,
      icon: BadgeCheck,
    },
  ]

  return (
    <div>
      <div className="mb-8">
        <p className="text-[#6b5143]">Bine ai venit,</p>

        <h1 className="text-5xl italic font-serif text-[#4b3427]">
          {user.name || 'Administrator'} 👋
        </h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">
        {cards.map((item) => {
          const Icon = item.icon

          return (
            <div
              key={item.title}
              className="rounded-3xl bg-white/70 backdrop-blur-xl p-6 shadow-xl border border-white/50"
            >
              <div className="w-12 h-12 rounded-2xl bg-[#f4eadc] text-[#a87319] flex items-center justify-center mb-5">
                <Icon size={24} />
              </div>

              <p className="text-[#6b5143] font-semibold">
                {item.title}
              </p>

              <h2 className="text-3xl font-bold text-[#4b3427] mt-2">
                {item.value}
              </h2>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default DashboardHome