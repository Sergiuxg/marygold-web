import Header from '../components/Header'
import Footer from '../components/Footer'
import { Helmet } from 'react-helmet-async'

function MassageTherapeutic() {
  return (
    <>
      <Helmet>
        <title>
          Masaj Terapeutic în Chișinău | MaryGold by Ana Massage
        </title>

        <meta
          name="description"
          content="Masaj terapeutic în Chișinău la MaryGold by Ana Massage. Ședințe pentru reducerea tensiunii musculare, relaxare și recuperare. Programează-te online."
        />

        <link
          rel="canonical"
          href="https://marygold.md/masaj-terapeutic-chisinau"
        />

        <meta
          property="og:title"
          content="Masaj Terapeutic în Chișinău | MaryGold by Ana Massage"
        />

        <meta
          property="og:description"
          content="Descoperă masajul terapeutic MaryGold by Ana Massage în Chișinău pentru relaxare, reducerea tensiunii musculare și recuperare."
        />

        <meta
          property="og:url"
          content="https://marygold.md/masaj-terapeutic-chisinau"
        />

        <meta
          property="og:type"
          content="website"
        />

        <meta
          property="og:image"
          content="https://marygold.md/lotus.png"
        />
      </Helmet>

      <Header />

      <main className="servicePage">
        <section className="servicePageHero">
          <span>MASAJ TERAPEUTIC</span>

          <h1>
            Masaj terapeutic în Chișinău pentru relaxare și recuperare
          </h1>

          <p>
            Masajul terapeutic este recomandat pentru reducerea tensiunii
            musculare, ameliorarea disconfortului și susținerea procesului de
            recuperare. La MaryGold by Ana Massage, ședințele sunt adaptate
            nevoilor fiecărui client.
          </p>

          <a href="/#booking" className="primaryBtn">
            Programează-te online
          </a>
        </section>

        <section className="servicePageContent">
          <div className="servicePageCard">
            <h2>Beneficiile masajului terapeutic</h2>

            <ul>
              <li>Reducerea tensiunii musculare</li>
              <li>Ameliorarea durerilor musculare</li>
              <li>Îmbunătățirea mobilității</li>
              <li>Susținerea recuperării fizice</li>
              <li>Relaxare și reducerea stresului</li>
            </ul>
          </div>

          <div className="servicePageCard">
            <h2>Durată și preț</h2>

            <p>
              Prețurile și duratele disponibile sunt actualizate permanent în
              sistemul MaryGold și pot fi consultate în secțiunea de prețuri.
            </p>

            <a href="/#prices" className="secondaryBtn">
              Vezi prețurile
            </a>
          </div>

          <div className="servicePageCard">
            <h2>Programare masaj terapeutic în Chișinău</h2>

            <p>
              Poți face programarea online în câteva secunde. Alegi serviciul,
              data și ora disponibilă, iar programarea ajunge direct în
              sistemul salonului.
            </p>

            <a href="/#booking" className="primaryBtn">
              Alege o oră disponibilă
            </a>
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}

export default MassageTherapeutic