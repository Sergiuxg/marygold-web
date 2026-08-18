import { useEffect, useMemo, useState } from 'react'
import { getServices, type Service } from '../api/services'

type GroupedPrice = {
  duration: string
  price: string
}

type GroupedService = {
  title: string
  prices: GroupedPrice[]
}

function PriceCard({
  title,
  prices,
}: {
  title: string
  prices: GroupedPrice[]
}) {
  return (
    <div className="priceCard">
      <h3>{title}</h3>

      {prices.map((item) => (
        <div
          className="priceRow"
          key={`${title}-${item.duration}-${item.price}`}
        >
          <span>{item.duration}</span>
          <strong>{item.price}</strong>
        </div>
      ))}
    </div>
  )
}

function Prices() {
  const [services, setServices] = useState<Service[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getServices({
      page: 1,
      limit: 100,
      sortBy: 'name',
      order: 'asc',
    })
      .then((result) => {
        setServices(result.data)
      })
      .catch((error) => {
        console.error('PRICES SERVICES ERROR:', error)
      })
      .finally(() => {
        setLoading(false)
      })
  }, [])

  const groupedServices = useMemo(() => {
    const grouped = new Map<string, GroupedService>()

    services
      .filter((service) => service.isActive)
      .forEach((service) => {
        const normalizedName = service.name.trim()

        if (!grouped.has(normalizedName)) {
          grouped.set(normalizedName, {
            title: normalizedName,
            prices: [],
          })
        }

        const currentGroup = grouped.get(normalizedName)!

        currentGroup.prices.push({
          duration:
            service.duration >= 600
              ? 'Pachet 10 ședințe'
              : `${service.duration} min`,
          price: `${service.price} lei`,
        })
      })

    return Array.from(grouped.values()).map((group) => ({
      ...group,
      prices: group.prices.sort((a, b) => {
        const getDuration = (value: string) => {
          if (value.includes('Pachet')) return 9999
          return Number.parseInt(value)
        }

        return getDuration(a.duration) - getDuration(b.duration)
      }),
    }))
  }, [services])

  return (
    <section id="prices" className="prices">
      <div className="pricesHeader">
        <div>
          <span>LISTA DE PREȚURI</span>
          <h2>Prețuri clare pentru fiecare ședință</h2>
        </div>

        <p>
          Alege durata potrivită, iar la programare selectezi serviciul,
          ziua și ora disponibilă.
        </p>
      </div>

      {loading ? (
        <p>Se încarcă prețurile...</p>
      ) : (
        <div className="pricesGrid">
          {groupedServices.map((service) => (
            <PriceCard
              key={service.title}
              title={service.title}
              prices={service.prices}
            />
          ))}
        </div>
      )}
    </section>
  )
}

export default Prices