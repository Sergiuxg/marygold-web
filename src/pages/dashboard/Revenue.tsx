import { useEffect, useState } from 'react'
import {
  CalendarCheck,
  Wallet,
  TrendingUp,
  BadgeCheck,
} from 'lucide-react'
import { getOverviewStatistics } from '../../api/statistics'

type RevenueData = {
  revenueToday?: number
  revenueWeek?: number
  revenueMonth?: number
  revenueTotal?: number
  confirmedBookings?: number
}

function Revenue() {
  const [data, setData] = useState<RevenueData | null>(null)

  useEffect(() => {
    getOverviewStatistics()
      .then(setData)
      .catch((error) => {
        console.error(error)

        setData({
          revenueToday: 0,
          revenueWeek: 0,
          revenueMonth: 0,
          revenueTotal: 0,
          confirmedBookings: 0,
        })
      })
  }, [])

  if (!data) {
    return <h2>Se încarcă veniturile...</h2>
  }

  const cards = [
    {
      title: 'Venit azi',
      value: `${data.revenueToday ?? 0} lei`,
      icon: Wallet,
    },
    {
      title: 'Venit săptămână',
      value: `${data.revenueWeek ?? 0} lei`,
      icon: TrendingUp,
    },
    {
      title: 'Venit lună',
      value: `${data.revenueMonth ?? 0} lei`,
      icon: CalendarCheck,
    },
    {
      title: 'Programări confirmate',
      value: data.confirmedBookings ?? 0,
      icon: BadgeCheck,
    },
  ]

  return (
    <div>
      <h1>Venituri</h1>

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

      <div className="mt-8 rounded-3xl bg-gradient-to-br from-[#a87319] to-[#4b3427] p-8 text-white shadow-xl">
        <p className="text-white/70">Venit total confirmat</p>

        <h2 className="text-5xl font-bold mt-3">
          {data.revenueTotal ?? 0} lei
        </h2>
      </div>
    </div>
  )
}

export default Revenue