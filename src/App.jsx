import { Routes, Route } from 'react-router-dom'
import Landing from './pages/landing/Landing'
import Login from './pages/Login'
import Dashboard from './pages/dashboard/Dashboard'
import AdminPanel from './pages/admin/AdminPanel'

export default function App() {
  return (
    <Routes>
      <Route path="/"        element={<Landing />} />
      <Route path="/login"   element={<Login />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/admin"   element={<AdminPanel />} />
    </Routes>
  )
}
