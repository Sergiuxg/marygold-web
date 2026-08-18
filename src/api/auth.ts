const API_URL =
  import.meta.env.VITE_API_URL || 'http://localhost:5001/api'
type LoginData = {
  email: string
  password: string
}

type RegisterData = {
  name: string
  email: string
  password: string
  role: 'admin' | 'developer'
}

export async function loginUser(data: LoginData) {
  const response = await fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })

  const result = await response.json()

  if (!response.ok) {
    throw new Error(result.message || 'Login failed')
  }

  return result
}

export async function registerUser(data: RegisterData) {
  const response = await fetch(`${API_URL}/auth/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })

  const result = await response.json()

  if (!response.ok) {
    throw new Error(result.message || 'Register failed')
  }

  return result
}