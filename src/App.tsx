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

import MassageClassic from './pages/MassageClassic'
import MassageTherapeutic from './pages/MassageTherapeutic'
import MassageAnticellulite from './pages/MassageAnticellulite'
import MassageHoney from './pages/MassageHoney'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public */}
        <Route path="/" element={<Home />} />

        <Route
          path="/masaj-clasic-chisinau"
          element={<MassageClassic />}
        />

        <Route
          path="/masaj-terapeutic-chisinau"
          element={<MassageTherapeutic />}
        />

        <Route
          path="/masaj-anticelulitic-chisinau"
          element={<MassageAnticellulite />}
        />

        <Route
          path="/masaj-cu-miere-chisinau"
          element={<MassageHoney />}
        />

        {/* Login */}
        <Route path="/login" element={<Login />} />

        {/* Admin */}
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

        {/* Developer */}
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