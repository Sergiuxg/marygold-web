import { useEffect, useState } from 'react'
import {
  createService,
  deleteService,
  getServices,
  updateService,
  type Service,
} from '../../api/services'
import '../../App.css'

function Services() {
  const [services, setServices] = useState<Service[]>([])
  const [editingId, setEditingId] = useState<string | null>(null)

  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [duration, setDuration] = useState(60)
  const [price, setPrice] = useState(400)
  const [category, setCategory] = useState('')
  const [imageUrl, setImageUrl] = useState('')
  const [isActive, setIsActive] = useState(true)
  const [isFeatured, setIsFeatured] = useState(false)
  const [message, setMessage] = useState('')

  const [search, setSearch] = useState('')
  const [sortBy, setSortBy] = useState('createdAt')
  const [order, setOrder] = useState<'asc' | 'desc'>('desc')

  const limit = 50

  async function loadServices() {
    const result = await getServices({
      search,
      sortBy,
      order,
      page: 1,
      limit,
    })

    setServices(result.data)
  }

  useEffect(() => {
    loadServices().catch(console.error)
  }, [search, sortBy, order])

  function resetForm() {
    setEditingId(null)
    setName('')
    setDescription('')
    setDuration(60)
    setPrice(400)
    setCategory('')
    setImageUrl('')
    setIsActive(true)
    setIsFeatured(false)
  }

  function startEdit(service: Service) {
    setEditingId(service.id)
    setName(service.name)
    setDescription(service.description || '')
    setDuration(service.duration)
    setPrice(service.price)
    setCategory(service.category || '')
    setImageUrl(service.imageUrl || '')
    setIsActive(service.isActive)
    setIsFeatured(service.isFeatured)

    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setMessage('')

    const payload = {
      name,
      description,
      duration,
      price,
      category,
      imageUrl,
      isActive,
      isFeatured,
    }

    try {
      if (editingId) {
        await updateService(editingId, payload)
        setMessage('Serviciul a fost actualizat.')
      } else {
        await createService(payload)
        setMessage('Serviciul a fost adăugat.')
      }

      resetForm()
      await loadServices()
    } catch (error) {
      setMessage(
        error instanceof Error
          ? error.message
          : 'A apărut o eroare.'
      )
    }
  }

  async function handleDelete(id: string) {
    const confirmed = window.confirm(
      'Sigur vrei să ștergi acest serviciu?'
    )

    if (!confirmed) return

    try {
      await deleteService(id)
      await loadServices()
    } catch (error) {
      setMessage(
        error instanceof Error
          ? error.message
          : 'Serviciul nu a putut fi șters.'
      )
    }
  }

  async function toggleActive(service: Service) {
    try {
      await updateService(service.id, {
        isActive: !service.isActive,
      })

      await loadServices()
    } catch (error) {
      console.error(error)
    }
  }

  async function toggleFeatured(service: Service) {
    try {
      await updateService(service.id, {
        isFeatured: !service.isFeatured,
      })

      await loadServices()
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div>
      <h1>Servicii</h1>

      <div className="serviceFilters">
        <input
          type="text"
          placeholder="Caută serviciu..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option value="createdAt">Cele mai noi</option>
          <option value="name">Nume</option>
          <option value="price">Preț</option>
          <option value="duration">Durată</option>
        </select>

        <select
          value={order}
          onChange={(e) =>
            setOrder(e.target.value as 'asc' | 'desc')
          }
        >
          <option value="desc">Descrescător</option>
          <option value="asc">Crescător</option>
        </select>
      </div>

      <form className="serviceForm" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Denumire serviciu"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <textarea
          placeholder="Descriere"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <div className="formGrid">
          <input
            type="number"
            placeholder="Durata"
            value={duration}
            onChange={(e) =>
              setDuration(Number(e.target.value))
            }
            required
          />

          <input
            type="number"
            placeholder="Preț"
            value={price}
            onChange={(e) =>
              setPrice(Number(e.target.value))
            }
            required
          />
        </div>

        <div className="formGrid">
          <input
            type="text"
            placeholder="Categorie"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />

          <input
            type="text"
            placeholder="Imagine URL"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
          />
        </div>

        <div className="serviceChecks">
          <label>
            <input
              type="checkbox"
              checked={isActive}
              onChange={(e) => setIsActive(e.target.checked)}
            />
            Activ
          </label>

          <label>
            <input
              type="checkbox"
              checked={isFeatured}
              onChange={(e) =>
                setIsFeatured(e.target.checked)
              }
            />
            Recomandat
          </label>
        </div>

        {message && (
          <p className="formMessage">{message}</p>
        )}

        <div className="bookingActions">
          <button className="submitBtn" type="submit">
            {editingId
              ? 'Salvează modificările'
              : 'Adaugă serviciu'}
          </button>

          {editingId && (
            <button
              type="button"
              className="cancelBtn"
              onClick={resetForm}
            >
              Renunță
            </button>
          )}
        </div>
      </form>

      <div className="servicesAdminGrid">
        {services.map((service) => (
          <div
            key={service.id}
            className="adminServiceCard"
          >
            {service.imageUrl && (
              <img
                src={service.imageUrl}
                alt={service.name}
                className="serviceImage"
              />
            )}

            <div className="bookingHeader">
              <h2>{service.name}</h2>

              <span
                className={`status ${
                  service.isActive
                    ? 'confirmed'
                    : 'cancelled'
                }`}
              >
                {service.isActive ? 'Activ' : 'Inactiv'}
              </span>
            </div>

            {service.isFeatured && (
              <span className="featuredBadge">
                ⭐ Recomandat
              </span>
            )}

            <p>{service.description}</p>

            {service.category && (
              <p>
                <strong>Categorie:</strong>{' '}
                {service.category}
              </p>
            )}

            <div className="serviceMeta">
              <span>{service.duration} min</span>
              <strong>{service.price} lei</strong>
            </div>

            <div className="serviceCardActions">
  <button
    className="serviceAction editAction"
    onClick={() => startEdit(service)}
  >
    ✏️ Editează
  </button>

  <button
    className="serviceAction neutralAction"
    onClick={() => toggleActive(service)}
  >
    {service.isActive ? '⏸ Dezactivează' : '▶ Activează'}
  </button>

  <button
    className="serviceAction featuredAction"
    onClick={() => toggleFeatured(service)}
  >
    {service.isFeatured
      ? '⭐ Scoate recomandarea'
      : '⭐ Recomandă'}
  </button>

  <button
    className="serviceAction deleteAction"
    onClick={() => handleDelete(service.id)}
  >
    🗑 Șterge
  </button>
</div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Services