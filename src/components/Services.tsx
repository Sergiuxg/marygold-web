import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { getServices, type Service } from '../api/services'
import LotusIcon from './LotusIcon'

type GroupedService = {
  title: string
  subtitle: string
  text: string
  slug?: string
}

function getServiceSlug(name: string) {
  const normalized = name
    .toLowerCase()
    .replace(/ă|â/g, 'a')
    .replace(/î/g, 'i')
    .replace(/ș|ş/g, 's')
    .replace(/ț|ţ/g, 't')

  if (normalized.includes('clasic')) {
    return '/masaj-clasic-chisinau'
  }

  if (normalized.includes('terapeutic')) {
    return '/masaj-terapeutic-chisinau'
  }

  if (normalized.includes('anticelulitic')) {
    return '/masaj-anticelulitic-chisinau'
  }

  if (normalized.includes('miere')) {
    return '/masaj-cu-miere-chisinau'
  }

  if (normalized.includes('ventuze')) {
    return '/masaj-cu-ventuze-chisinau'
  }

  return undefined
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

            subtitle:
              service.category ||
              'Servicii de masaj în Chișinău',

            text:
              service.description ||
              `Descoperă ${name.toLowerCase()} la MaryGold by Ana Massage în Chișinău, pentru relaxare, recuperare și stare de bine.`,

            slug: getServiceSlug(name),
          })
        }
      })

    return Array.from(grouped.values())
  }, [services])

  return (
    <section id="services" className="services">
      <div className="sectionHeader center">
        <span>SERVICII DE MASAJ</span>

        <h2>
          Servicii de masaj în Chișinău pentru relaxare și recuperare
        </h2>

        <p>
          Descoperă serviciile MaryGold by Ana Massage: masaj clasic,
          terapeutic, anticelulitic, masaj cu miere, masaj cu ventuze și
          alte terapii adaptate nevoilor tale.
        </p>
      </div>

      <div className="serviceGrid">
        {groupedServices.map((service) => (
          <ServiceCard
            key={service.title}
            title={service.title}
            subtitle={service.subtitle}
            text={service.text}
            slug={service.slug}
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
  slug?: string
}

function ServiceCard({
  title,
  subtitle,
  text,
  slug,
}: ServiceCardProps) {
  return (
    <article className="serviceCard">
      <div className="smallIcon">
        <LotusIcon size={30} />
      </div>

      <h3>{title}</h3>

      <h4>{subtitle}</h4>

      <p>{text}</p>

      {slug && (
        <Link
          to={slug}
          className="serviceDetailsLink"
          aria-label={`Află mai multe despre ${title}`}
        >
          Află mai multe
          <span aria-hidden="true"> →</span>
        </Link>
      )}
    </article>
  )
}

export default Services