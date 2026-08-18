import { useEffect, useMemo, useState } from 'react'
import { getServices, type Service } from '../api/services'
import LotusIcon from './LotusIcon'

type GroupedService = {
  title: string
  subtitle: string
  text: string
}

function Services() {
  const [services, setServices] = useState<Service[]>([])

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
        console.error('SERVICES ERROR:', error)
      })
  }, [])

  const groupedServices = useMemo(() => {
    const grouped = new Map<string, GroupedService>()

    services
      .filter((service) => service.isActive)
      .forEach((service) => {
        const name = service.name.trim()

        if (!grouped.has(name)) {
          grouped.set(name, {
            title: name,
            subtitle: service.category || 'Masaj și relaxare',
            text:
              service.description ||
              'Serviciu profesional de masaj pentru relaxare și stare de bine.',
          })
        }
      })

    return Array.from(grouped.values())
  }, [services])

  return (
    <section id="services" className="services">
      <div className="sectionHeader center">
        <span>SERVICII</span>

        <h2>Alege terapia potrivită pentru tine</h2>

        <p>
          Fiecare serviciu este creat pentru o nevoie diferită: relaxare,
          recuperare, remodelare sau detoxifiere.
        </p>
      </div>

      <div className="serviceGrid">
        {groupedServices.map((service) => (
          <ServiceCard
            key={service.title}
            title={service.title}
            subtitle={service.subtitle}
            text={service.text}
          />
        ))}
      </div>
    </section>
  )
}

type ServiceCardProps = {
  title: string
  subtitle: string
  text: string
}

function ServiceCard({
  title,
  subtitle,
  text,
}: ServiceCardProps) {
  return (
    <div className="serviceCard">
      <div className="smallIcon">
        <LotusIcon size={30} />
      </div>

      <h3>{title}</h3>

      <h4>{subtitle}</h4>

      <p>{text}</p>
    </div>
  )
}

export default Services