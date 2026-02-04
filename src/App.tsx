import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider, useAuth } from './contexts/AuthContext'
import Landing from './pages/Landing'
import Login from './pages/Login'
import AdminLayout from './pages/admin/AdminLayout'
import RestaurantDashboard from './pages/restaurant/RestaurantDashboard'
import Reservations from './pages/restaurant/Reservations'
import MenuManagement from './pages/restaurant/MenuManagement'
import RestaurantSettings from './pages/restaurant/RestaurantSettings'
import RoomsTablesManagement from './pages/restaurant/RoomsTablesManagement'
import RestaurantDetails from './pages/restaurant/RestaurantDetails'

function AppRoutes() {
  const { isAuthenticated, isOwner } = useAuth();

  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />

      <Route
        path="/admin/*"
        element={isAuthenticated ? <AdminLayout /> : <Navigate to="/login" replace />}
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
      <Route
        path="/restaurant/settings"
        element={isAuthenticated ? <RestaurantSettings /> : <Navigate to="/login" replace />}
      />
      <Route
        path="/restaurant/rooms"
        element={isAuthenticated ? <RoomsTablesManagement /> : <Navigate to="/login" replace />}
      />
      <Route
        path="/restaurant/details"
        element={isAuthenticated ? <RestaurantDetails /> : <Navigate to="/login" replace />}
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
