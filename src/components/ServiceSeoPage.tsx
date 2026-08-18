import { Helmet } from 'react-helmet-async'
import Header from './Header'
import Footer from './Footer'

type ServiceSeoPageProps = {
  label: string
  title: string
  description: string
  canonical: string
  benefits: string[]
}

function ServiceSeoPage({
  label,
  title,
  description,
  canonical,
  benefits,
}: ServiceSeoPageProps) {
  return (
    <>
      <Helmet>
        <title>{title} | MaryGold by Ana Massage</title>

        <meta
          name="description"
          content={`${description} Programează-te online la MaryGold by Ana Massage în Chișinău.`}
        />

        <link
          rel="canonical"
          href={`https://marygold.md${canonical}`}
        />

        <meta
          property="og:title"
          content={`${title} | MaryGold by Ana Massage`}
        />

        <meta
          property="og:description"
          content={description}
        />

        <meta
          property="og:url"
          content={`https://marygold.md${canonical}`}
        />

        <meta property="og:type" content="website" />

        <meta
          property="og:image"
          content="https://marygold.md/lotus.png"
        />
      </Helmet>

      <Header />

      <main className="servicePage">
        <section className="servicePageHero">
          <span>{label}</span>

          <h1>{title}</h1>

          <p>{description}</p>

          <a href="/#booking" className="primaryBtn">
            Programează-te online
          </a>
        </section>

        <section className="servicePageContent">
          <article className="servicePageCard">
            <h2>Beneficii</h2>

            <ul>
              {benefits.map((benefit) => (
                <li key={benefit}>{benefit}</li>
              ))}
            </ul>
          </article>

          <article className="servicePageCard">
            <h2>Durată și preț</h2>

            <p>
              Duratele și prețurile disponibile sunt actualizate permanent
              în sistemul MaryGold.
            </p>

            <a href="/#prices" className="secondaryBtn">
              Vezi prețurile
            </a>
          </article>

          <article className="servicePageCard">
            <h2>Programare online</h2>

            <p>
              Alege serviciul, data și ora disponibilă, iar programarea este
              înregistrată direct în sistem.
            </p>

            <a href="/#booking" className="primaryBtn">
              Alege o oră disponibilă
            </a>
          </article>
        </section>
      </main>

      <Footer />
    </>
  )
}

export default ServiceSeoPage