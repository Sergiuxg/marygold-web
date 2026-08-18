import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { loginUser } from '../api/auth'

function Login() {
  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault()

    try {
      const response = await loginUser({
        email,
        password,
      })

      localStorage.setItem('token', response.token)
      localStorage.setItem('user', JSON.stringify(response.user))

      if (response.user.role === 'developer') {
        navigate('/developer')
      } else {
        navigate('/admin')
      }
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message)
      } else {
        setError('A apărut o eroare.')
      }
    }
  }

  return (
    <div className="loginPage">
      <form className="loginCard" onSubmit={handleLogin}>
        <div className="logoIcon">✽</div>

        <h1>Autentificare</h1>
        <p>Intră în panoul de administrare.</p>

        <label>Email</label>

        <input
          type="email"
          placeholder="admin@gmail.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label>Parolă</label>

        <input
          type="password"
          placeholder="********"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {error && (
          <p style={{ color: 'red', marginBottom: 20 }}>
            {error}
          </p>
        )}

        <button className="submitBtn" type="submit">
          Intră în cont
        </button>
      </form>
    </div>
  )
}

export default Login