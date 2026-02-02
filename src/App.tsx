import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider, useAuth } from './contexts/AuthContext'
import Landing from './pages/Landing'
import Login from './pages/Login'
import AdminDashboard from './pages/admin/AdminDashboard'
import RestaurantDashboard from './pages/restaurant/RestaurantDashboard'
import Reservations from './pages/restaurant/Reservations'
import MenuManagement from './pages/restaurant/MenuManagement'

function AppRoutes() {
  const { isAuthenticated, isOwner } = useAuth();

  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />

      <Route
        path="/admin/*"
        element={isAuthenticated ? <AdminDashboard /> : <Navigate to="/login" replace />}
      />

      <Route
        path="/restaurant"
        element={isAuthenticated ? <RestaurantDashboard /> : <Navigate to="/login" replace />}
      />
      <Route
        path="/restaurant/dashboard"
        element={isAuthenticated ? <RestaurantDashboard /> : <Navigate to="/login" replace />}
      />
      <Route
        path="/restaurant/reservations"
        element={isAuthenticated ? <Reservations /> : <Navigate to="/login" replace />}
      />
      <Route
        path="/restaurant/menu"
        element={isAuthenticated ? <MenuManagement /> : <Navigate to="/login" replace />}
      />

      {/* Redirect generic dashboard to specific one */}
      <Route
        path="/dashboard/*"
        element={
          isAuthenticated
            ? (isOwner ? <Navigate to="/restaurant/dashboard" replace /> : <Navigate to="/admin/dashboard" replace />)
            : <Navigate to="/login" replace />
        }
      />
    </Routes>
  )
}

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
