function Hero() {
  return (
    <section className="hero">
      <div className="heroText">
        <div className="badge">
          ✣ Cabinet masaj • relaxare • recuperare • detoxifiere
        </div>

        <h1>Răsfață-ți corpul cu o experiență premium de masaj</h1>

        <p>
          La MaryGold by Ana Massage, fiecare ședință este gândită pentru
          relaxare, echilibru și stare de bine. Alege serviciul dorit și
          rezervă online ora potrivită pentru tine.
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