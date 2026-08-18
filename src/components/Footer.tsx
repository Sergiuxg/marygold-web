import { FaInstagram, FaFacebookF } from 'react-icons/fa'

function Footer() {
  return (
    <footer id="contact" className="footer">
      <div className="footerTop">
        <div className="footerBrand">
          <h2>MaryGold</h2>
          <span>by Ana Massage</span>

          <p>
            Cabinet de masaj în Chișinău dedicat relaxării,
            recuperării și stării tale de bine.
          </p>
        </div>

        <div className="footerColumn">
          <h3>Navigare</h3>

          <a href="#home">Acasă</a>
          <a href="#services">Servicii de masaj</a>
          <a href="#prices">Prețuri</a>
          <a href="#booking">Programare online</a>
        </div>

        <div className="footerColumn">
          <h3>Contact</h3>

          <a href="tel:+37367545494">
            +373 675 454 94
          </a>

          <a href="mailto:marygoldmassage@gmail.com">
            marygoldmassage@gmail.com
          </a>

          <address>
            Grigore Vieru 9, Chișinău, Republica Moldova
          </address>
        </div>

        <div className="footerColumn">
          <h3>Program</h3>

          <p>Luni – Sâmbătă: 09:00 – 22:00</p>
          <p>Duminică: Închis</p>

          <div className="socialLinks">
            <a
              href="https://www.instagram.com/anka_gorbatiuc?igsh=dWlydXVoczBvdGR0&utm_source=qr"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="MaryGold by Ana Massage pe Instagram"
            >
              <FaInstagram size={22} />
            </a>

            <a
              href="https://www.facebook.com/share/17wPMxgYPo/?mibextid=wwXIfr"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="MaryGold by Ana Massage pe Facebook"
            >
              <FaFacebookF size={20} />
            </a>
          </div>
        </div>
      </div>

      <div className="footerBottom">
        <p>
          © {new Date().getFullYear()} MaryGold by Ana Massage.
          Toate drepturile rezervate.
        </p>

        <p>
          Masaj în Chișinău pentru relaxare, recuperare și stare de bine.
        </p>
      </div>
    </footer>
  )
}

export default Footer