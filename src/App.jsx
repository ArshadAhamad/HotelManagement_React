import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import HomePage from './pages/homepage'
import RoomsPage from './pages/RoomsPage'
import BookingPage from './pages/BookingPage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import ProfilePage from './pages/ProfilePage'
import AdminPage from './pages/AdminPage'
import StaffPage from './pages/StaffPage'
import GalleryPage from './pages/GalleryPage'
import UnauthorizedPage from './pages/UnauthorizedPage'
import ProtectedRoute from './components/ProtectedRoute'
import NotFoundPage from './pages/NotFoundPage'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="rooms" element={<RoomsPage />} />
        <Route path="booking" element={<BookingPage />} />
        <Route path="gallery" element={<GalleryPage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<RegisterPage />} />
        
        {/* Protected Routes */}
        <Route path="profile" element={
          <ProtectedRoute>
            <ProfilePage />
          </ProtectedRoute>
        } />
        
        <Route path="admin" element={
          <ProtectedRoute requiredRole="admin">
            <AdminPage />
          </ProtectedRoute>
        } />
        
        <Route path="staff" element={
          <ProtectedRoute requiredRole="staff">
            <StaffPage />
          </ProtectedRoute>
        } />
        
        {/* Unauthorized Page */}
        <Route path="unauthorized" element={<UnauthorizedPage />} />
        
        {/* 404 Page */}
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  )
}

export default App
