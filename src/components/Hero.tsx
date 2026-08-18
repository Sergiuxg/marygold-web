function Hero() {
  return (
    <section className="hero">
      <div className="heroText">
        <div className="badge">
          ✣ Cabinet de masaj în Chișinău • relaxare • recuperare • detoxifiere
        </div>

        <h1>
          Masaj în Chișinău pentru relaxare, recuperare și stare de bine
        </h1>

        <p>
          La MaryGold by Ana Massage beneficiezi de servicii de masaj
          adaptate nevoilor tale, într-o atmosferă relaxantă și confortabilă.
          Alege serviciul dorit și programează-te online la ora potrivită
          pentru tine.
        </p>

        <div className="heroButtons">
          <a href="#booking" className="primaryBtn">
            Fă o programare online
          </a>

          <a href="#services" className="secondaryBtn">
            Vezi serviciile
          </a>
        </div>
      </div>

      <div className="heroCard">
        <div className="heroCardContent">
          <h2>MaryGold</h2>
          <span>by Ana Massage</span>

          <div className="miniCard">
            <p>PROGRAMĂRI ONLINE</p>

            <strong>
              Alege data, ora și serviciul în câteva secunde.
            </strong>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero