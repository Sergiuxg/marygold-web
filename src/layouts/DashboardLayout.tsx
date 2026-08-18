import { useState } from 'react'
import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import '../App.css'

function DashboardLayout() {
  const [menuOpen, setMenuOpen] = useState(false)

  const navigate = useNavigate()
  const user = JSON.parse(localStorage.getItem('user') || '{}')

  function logout() {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    navigate('/login')
  }

  function closeMenu() {
    setMenuOpen(false)
  }

  return (
    <div className="dashboardShell">
      <div className="mobileHeader">
        <button
          type="button"
          className="menuButton"
          onClick={() => setMenuOpen((current) => !current)}
          aria-label="Deschide meniul"
        >
          ☰
        </button>

        <h2>MaryGold</h2>
      </div>

      {menuOpen && (
        <button
          type="button"
          className="sidebarOverlay"
          onClick={closeMenu}
          aria-label="Închide meniul"
        />
      )}

      <aside className={`sidebar ${menuOpen ? 'open' : ''}`}>
        <div className="dashboardLogo">
          <div className="logoIcon">✽</div>

          <div>
            <h2>MaryGold</h2>
            <p>Admin Panel</p>
          </div>

          <button
            type="button"
            className="sidebarClose"
            onClick={closeMenu}
            aria-label="Închide meniul"
          >
            ×
          </button>
        </div>

        <nav className="dashboardNav">
          <NavLink to="" end onClick={closeMenu}>
            🏠 Dashboard
          </NavLink>

          <NavLink to="calendar" onClick={closeMenu}>
            📅 Calendar
          </NavLink>

          <NavLink to="services" onClick={closeMenu}>
            💆 Servicii
          </NavLink>

          <NavLink to="revenue" onClick={closeMenu}>
            💰 Venituri
          </NavLink>

          <NavLink to="statistics" onClick={closeMenu}>
            📊 Statistici
          </NavLink>

          {user.role === 'developer' && (
            <NavLink to="admins" onClick={closeMenu}>
              👥 Admini
            </NavLink>
          )}
        </nav>

        <button type="button" className="logoutBtn" onClick={logout}>
          🚪 Logout
        </button>
      </aside>

      <section className="dashboardMain">
        <header className="dashboardTopbar">
          <div>
            <p>Bine ai venit,</p>
            <h1>{user.name || 'Administrator'}</h1>
          </div>

          <div className="userBadge">
            <span>{user.role}</span>

            <div className="avatar">
              {user.name ? user.name[0].toUpperCase() : 'A'}
            </div>
          </div>
        </header>

        <div className="dashboardContent">
          <Outlet />
        </div>
      </section>
    </div>
  )
}

export default DashboardLayout