import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Home from './pages/Home'
import Login from './pages/Login'

import ProtectedRoute from './components/ProtectedRoute'
import DashboardLayout from './layouts/DashboardLayout'

import DashboardHome from './pages/dashboard/DashboardHome'
import Services from './pages/dashboard/Services'
import Admins from './pages/dashboard/Admins'
import Statistics from './pages/dashboard/Statistics'
import Calendar from './pages/dashboard/Calendar'
import Revenue from './pages/dashboard/Revenue'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/login" element={<Login />} />

        <Route
  path="/admin"
  element={
    <ProtectedRoute allowedRoles={['admin', 'developer']}>
      <DashboardLayout />
    </ProtectedRoute>
  }
>
  <Route index element={<DashboardHome />} />
  <Route path="calendar" element={<Calendar />} />
  <Route path="services" element={<Services />} />
  <Route path="revenue" element={<Revenue />} />
  <Route path="statistics" element={<Statistics />} />
</Route>

        <Route
          path="/developer"
          element={
            <ProtectedRoute allowedRoles={['developer']}>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<DashboardHome />} />
          <Route path="calendar" element={<Calendar />} />
          <Route path="services" element={<Services />} />
          <Route path="admins" element={<Admins />} />
          <Route path="statistics" element={<Statistics />} />
          <Route path="revenue" element={<Revenue />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App