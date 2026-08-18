import LotusIcon from '../components/LotusIcon'
function Header() {
  return (
    <header className="navbar">
      <div className="logo">
        <div className="logoIcon">
          <div className="logoIcon">
  <LotusIcon size={38} />
</div>
        </div>

        <div>
          <h1>MaryGold</h1>
          <p>BY ANA MASSAGE</p>
        </div>
      </div>

      <nav>
        <a href="#services">Servicii</a>
        <a href="#prices">Prețuri</a>
        <a href="#booking">Programare</a>
        <a href="#contact">Contact</a>
      </nav>

      <a className="navBtn" href="#booking">
        Programează-te
      </a>
    </header>
  )
}

export default Header