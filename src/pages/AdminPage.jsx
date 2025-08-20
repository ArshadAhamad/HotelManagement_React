import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import dataService from '../services/dataService'
import BookingModal from '../components/BookingModal'
import RoomModal from '../components/RoomModal'
import UserModal from '../components/UserModal'
import EditRoomModal from '../components/EditRoomModal'
import MaintenanceModal from '../components/MaintenanceModal'
import EditBookingModal from '../components/EditBookingModal'
import EditUserModal from '../components/EditUserModal'

const AdminPage = () => {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('dashboard')
  const [isLoading, setIsLoading] = useState(true)
  const [stats, setStats] = useState(null)
  const [bookings, setBookings] = useState([])
  const [rooms, setRooms] = useState([])
  const [users, setUsers] = useState([])
  
  // Modal states
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false)
  const [isRoomModalOpen, setIsRoomModalOpen] = useState(false)
  const [isUserModalOpen, setIsUserModalOpen] = useState(false)
  const [isEditRoomModalOpen, setIsEditRoomModalOpen] = useState(null)
  const [isMaintenanceModalOpen, setIsMaintenanceModalOpen] = useState(null)
  const [isEditBookingModalOpen, setIsEditBookingModalOpen] = useState(null)
  const [isEditUserModalOpen, setIsEditUserModalOpen] = useState(null)
  
  // Room action handlers
  const handleRoomClean = async (roomId) => {
    try {
      const updatedRoom = await dataService.markRoomCleaned(roomId)
      // Update the rooms state with the cleaned room
      setRooms(rooms.map(room => room.id === roomId ? updatedRoom : room))
      // Show success message or notification
      alert('Room marked as cleaned successfully!')
    } catch (error) {
      console.error('Error cleaning room:', error)
      alert('Failed to mark room as cleaned')
    }
  }

  const handleRoomUpdate = async (roomId, roomData) => {
    try {
      const updatedRoom = await dataService.updateRoom(roomId, roomData)
      // Update the rooms state with the updated room
      setRooms(rooms.map(room => room.id === roomId ? updatedRoom : room))
      // Close the edit modal
      setIsEditRoomModalOpen(null)
      // Show success message or notification
      alert('Room updated successfully!')
    } catch (error) {
      console.error('Error updating room:', error)
      alert('Failed to update room')
    }
  }

  const handleRoomMaintenance = async (roomId, issue) => {
    try {
      const result = await dataService.markRoomMaintenance(roomId, issue)
      // Update the rooms state with the maintenance room
      setRooms(rooms.map(room => room.id === roomId ? result.room : room))
      // Close the maintenance modal
      setIsMaintenanceModalOpen(null)
      // Show success message or notification
      alert('Room marked for maintenance successfully!')
    } catch (error) {
      console.error('Error marking room for maintenance:', error)
      alert('Failed to mark room for maintenance')
    }
  }

  // Booking action handlers
  const handleEditBooking = (bookingId) => {
    setIsEditBookingModalOpen(bookingId)
  }

  const handleUpdateBooking = async (bookingId, bookingData) => {
    try {
      // Format the booking data to match the structure expected by the API
      const formattedBookingData = {
        roomId: bookingData.roomId,
        checkInDate: bookingData.checkInDate,
        checkOutDate: bookingData.checkOutDate,
        status: bookingData.status,
        guestId: bookingData.guestId
      };

      const updatedBooking = await dataService.updateBooking(bookingId, formattedBookingData)
      // Update the bookings state with the updated booking
      setBookings(bookings.map(booking => 
        booking.id === bookingId ? {
          id: updatedBooking.id,
          guest: `${updatedBooking.guest.firstName} ${updatedBooking.guest.lastName}`,
          room: `${updatedBooking.room.number} - ${updatedBooking.room.type}`,
          checkIn: updatedBooking.checkInDate,
          checkOut: updatedBooking.checkOutDate,
          status: updatedBooking.status,
          total: updatedBooking.totalCost
        } : booking
      ))
      // Close the edit modal
      setIsEditBookingModalOpen(null)
      // Show success message or notification
      alert('Booking updated successfully!')
    } catch (error) {
      console.error('Error updating booking:', error)
      alert('Failed to update booking')
    }
  }

  const handleCancelBooking = async (bookingId) => {
    try {
      const updatedBooking = await dataService.cancelBooking(bookingId)
      // Update the bookings state with the cancelled booking
      setBookings(bookings.map(booking => 
        booking.id === bookingId ? {
          ...booking,
          status: 'cancelled'
        } : booking
      ))
      // Show success message or notification
      alert('Booking cancelled successfully!')
    } catch (error) {
      console.error('Error cancelling booking:', error)
      alert('Failed to cancel booking')
    }
  }

  // User action handlers
  const handleEditUser = (userId) => {
    setIsEditUserModalOpen(userId)
  }

  const handleUpdateUser = async (userId, userData) => {
    try {
      const updatedUser = await dataService.updateUser(userId, userData)
      // Update the users state with the updated user
      setUsers(users.map(user => 
        user.id === userId ? {
          id: updatedUser.id,
          name: `${updatedUser.firstName} ${updatedUser.lastName}`,
          email: updatedUser.email,
          role: updatedUser.role,
          lastLogin: user.lastLogin
        } : user
      ))
      // Close the edit modal
      setIsEditUserModalOpen(null)
      // Show success message or notification
      alert('User updated successfully!')
    } catch (error) {
      console.error('Error updating user:', error)
      alert('Failed to update user')
    }
  }

  const handleDeactivateUser = async (userId) => {
    try {
      await dataService.deactivateUser(userId)
      // Update the users state to reflect deactivation
      setUsers(users.map(user => 
        user.id === userId ? {
          ...user,
          status: 'inactive'
        } : user
      ))
      // Show success message or notification
      alert('User deactivated successfully!')
    } catch (error) {
      console.error('Error deactivating user:', error)
      alert('Failed to deactivate user')
    }
  }

  // Check authentication and fetch data
  useEffect(() => {
    const isAuthenticated = localStorage.getItem('isAuthenticated')
    if (!isAuthenticated) {
      navigate('/login')
      return
    }
    
    // In a real app, you would check if the user has admin role
    // For demo purposes, we'll just simulate it
    const fetchData = async () => {
      try {
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 500))
        
        // Fetch hotel stats
        const hotelStats = await dataService.getHotelStats()
        setStats({
          totalBookings: hotelStats.totalBookings,
          pendingBookings: hotelStats.pendingBookings,
          occupiedRooms: hotelStats.occupiedRooms,
          availableRooms: hotelStats.availableRooms,
          revenue: hotelStats.revenue,
          customers: hotelStats.customers
        })
        
        // Fetch bookings
        const bookingsData = await dataService.getAllBookings()
        // Format bookings for display
        const formattedBookings = bookingsData.map(booking => ({
          id: booking.id,
          guest: `${booking.guest.firstName} ${booking.guest.lastName}`,
          room: `${booking.room.number} - ${booking.room.type}`,
          checkIn: booking.checkInDate,
          checkOut: booking.checkOutDate,
          status: booking.status,
          total: booking.totalCost
        })).slice(0, 5) // Only show first 5 bookings
        setBookings(formattedBookings)
        
        // Fetch rooms
        const roomsData = await dataService.getAllRooms()
        setRooms(roomsData)
        
        // Fetch users from the users array in data/users.js
        // In a real app, this would be an API call
        const usersData = await import('../data/users').then(module => module.default)
        // Format users for display
        const formattedUsers = usersData.map(user => ({
          id: user.id,
          name: `${user.firstName} ${user.lastName}`,
          email: user.email,
          role: user.role,
          lastLogin: new Date().toISOString().split('T')[0] + ' ' + 
                    new Date().toTimeString().split(' ')[0].substring(0, 5)
        }))
        setUsers(formattedUsers)
      } catch (error) {
        console.error('Error fetching admin data:', error)
      } finally {
        setIsLoading(false)
      }
    }
    
    fetchData()
  }, [])
  
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    )
  }
  
  return (
    <div className="w-full py-6 px-4">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
      
      {/* Tabs */}
      <div className="border-b border-gray-200 mb-6">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`${activeTab === 'dashboard' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'} whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
          >
            Dashboard
          </button>
          <button
            onClick={() => setActiveTab('bookings')}
            className={`${activeTab === 'bookings' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'} whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
          >
            Bookings
          </button>
          <button
            onClick={() => setActiveTab('rooms')}
            className={`${activeTab === 'rooms' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'} whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
          >
            Rooms
          </button>
          <button
            onClick={() => setActiveTab('users')}
            className={`${activeTab === 'users' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'} whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
          >
            Users
          </button>
        </nav>
      </div>
      
      {/* Dashboard Tab */}
      {activeTab === 'dashboard' && (
        <div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {/* Stats Cards */}
            <div className="bg-white shadow rounded-lg p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-blue-500 rounded-md p-3">
                  <svg className="h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">Total Bookings</dt>
                    <dd className="flex items-baseline">
                      <div className="text-2xl font-semibold text-gray-900">{stats.totalBookings}</div>
                      <div className="ml-2 flex items-baseline text-sm font-semibold text-green-600">
                        <svg className="self-center flex-shrink-0 h-5 w-5 text-green-500" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                          <path fillRule="evenodd" d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
                        </svg>
                        <span className="sr-only">Increased by</span>
                        12%
                      </div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
            
            <div className="bg-white shadow rounded-lg p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-green-500 rounded-md p-3">
                  <svg className="h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">Revenue (Monthly)</dt>
                    <dd className="flex items-baseline">
                      <div className="text-2xl font-semibold text-gray-900">${stats.revenue}</div>
                      <div className="ml-2 flex items-baseline text-sm font-semibold text-green-600">
                        <svg className="self-center flex-shrink-0 h-5 w-5 text-green-500" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                          <path fillRule="evenodd" d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
                        </svg>
                        <span className="sr-only">Increased by</span>
                        8.1%
                      </div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
            
            <div className="bg-white shadow rounded-lg p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-indigo-500 rounded-md p-3">
                  <svg className="h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">Customers</dt>
                    <dd className="flex items-baseline">
                      <div className="text-2xl font-semibold text-gray-900">{stats.customers}</div>
                      <div className="ml-2 flex items-baseline text-sm font-semibold text-green-600">
                        <svg className="self-center flex-shrink-0 h-5 w-5 text-green-500" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                          <path fillRule="evenodd" d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
                        </svg>
                        <span className="sr-only">Increased by</span>
                        5.4%
                      </div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Room Status */}
            <div className="bg-white shadow rounded-lg p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Room Status</h3>
              <div className="space-y-4">
                <div className="flex items-center">
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div className="bg-green-600 h-2.5 rounded-full" style={{ width: `${(stats.availableRooms / (stats.availableRooms + stats.occupiedRooms)) * 100}%` }}></div>
                  </div>
                  <span className="ml-4 text-sm font-medium text-gray-500">{stats.availableRooms} Available</span>
                </div>
                <div className="flex items-center">
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${(stats.occupiedRooms / (stats.availableRooms + stats.occupiedRooms)) * 100}%` }}></div>
                  </div>
                  <span className="ml-4 text-sm font-medium text-gray-500">{stats.occupiedRooms} Occupied</span>
                </div>
              </div>
            </div>
            
            {/* Booking Status */}
            <div className="bg-white shadow rounded-lg p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Booking Status</h3>
              <div className="space-y-4">
                <div className="flex items-center">
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div className="bg-yellow-500 h-2.5 rounded-full" style={{ width: `${(stats.pendingBookings / stats.totalBookings) * 100}%` }}></div>
                  </div>
                  <span className="ml-4 text-sm font-medium text-gray-500">{stats.pendingBookings} Pending</span>
                </div>
                <div className="flex items-center">
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div className="bg-purple-600 h-2.5 rounded-full" style={{ width: `${((stats.totalBookings - stats.pendingBookings) / stats.totalBookings) * 100}%` }}></div>
                  </div>
                  <span className="ml-4 text-sm font-medium text-gray-500">{stats.totalBookings - stats.pendingBookings} Confirmed</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Bookings Tab */}
      {activeTab === 'bookings' && (
        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Recent Bookings</h2>
            <button 
              onClick={() => setIsBookingModalOpen(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md transition duration-300"
            >
              New Booking
            </button>
          </div>
          
          <div className="bg-white shadow overflow-hidden rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Booking ID</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Guest</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Room</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Check-in</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Check-out</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {bookings.map((booking) => (
                  <tr key={booking.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{booking.id}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{booking.guest}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{booking.room}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{booking.checkIn}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{booking.checkOut}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${booking.status === 'confirmed' ? 'bg-green-100 text-green-800' : booking.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : booking.status === 'in-progress' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'}`}>
                        {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${booking.total}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button 
                        onClick={() => handleEditBooking(booking.id)}
                        className="text-blue-600 hover:text-blue-900 mr-3"
                      >
                        Edit
                      </button>
                      <button 
                        onClick={() => handleCancelBooking(booking.id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        Cancel
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
      
      {/* Rooms Tab */}
      {activeTab === 'rooms' && (
        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Room Management</h2>
            <button 
              onClick={() => setIsRoomModalOpen(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md transition duration-300"
            >
              Add Room
            </button>
          </div>
          
          <div className="bg-white shadow overflow-hidden rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Room Number</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price/Night</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Cleaned</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {rooms.map((room) => (
                  <tr key={room.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{room.id}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{room.type}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${room.status === 'available' ? 'bg-green-100 text-green-800' : room.status === 'occupied' ? 'bg-blue-100 text-blue-800' : room.status === 'maintenance' ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'}`}>
                        {room.status ? room.status.charAt(0).toUpperCase() + room.status.slice(1) : 'Unknown'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${room.price}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{room.lastCleaned}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button 
                        onClick={() => setIsEditRoomModalOpen(room.id)}
                        className="text-blue-600 hover:text-blue-900 mr-3"
                      >
                        Edit
                      </button>
                      <button 
                        onClick={() => handleRoomClean(room.id)}
                        className="text-green-600 hover:text-green-900 mr-3"
                      >
                        Clean
                      </button>
                      <button 
                        onClick={() => setIsMaintenanceModalOpen(room.id)}
                        className="text-yellow-600 hover:text-yellow-900"
                      >
                        Maintenance
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
      
      {/* Users Tab */}
      {activeTab === 'users' && (
        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">User Management</h2>
            <button 
              onClick={() => setIsUserModalOpen(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md transition duration-300"
            >
              Add User
            </button>
          </div>
          
          <div className="bg-white shadow overflow-hidden rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Login</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {users.map((user) => (
                  <tr key={user.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{user.id}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.email}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${user.role === 'admin' ? 'bg-purple-100 text-purple-800' : user.role === 'staff' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'}`}>
                        {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.lastLogin}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button 
                        onClick={() => handleEditUser(user.id)}
                        className="text-blue-600 hover:text-blue-900 mr-3"
                      >
                        Edit
                      </button>
                      <button 
                        onClick={() => handleDeactivateUser(user.id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        Deactivate
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
      {/* Modals */}
      <BookingModal 
        isOpen={isBookingModalOpen} 
        onClose={() => setIsBookingModalOpen(false)} 
        onSave={(newBooking) => {
          // Add the new booking to the bookings list
          setBookings(prev => [{
            id: newBooking.id,
            guest: newBooking.guest,
            room: newBooking.room,
            checkIn: newBooking.checkIn,
            checkOut: newBooking.checkOut,
            status: newBooking.status,
            total: newBooking.total
          }, ...prev]);
          
          // Update stats
          if (stats) {
            setStats(prev => ({
              ...prev,
              totalBookings: prev.totalBookings + 1,
              pendingBookings: prev.pendingBookings + 1
            }));
          }
        }} 
      />
      
      <RoomModal 
        isOpen={isRoomModalOpen} 
        onClose={() => setIsRoomModalOpen(false)} 
        onSave={(newRoom) => {
          // Add the new room to the rooms list
          setRooms(prev => [newRoom, ...prev]);
          
          // Update stats
          if (stats) {
            setStats(prev => ({
              ...prev,
              availableRooms: prev.availableRooms + 1
            }));
          }
        }} 
      />
      
      <UserModal 
        isOpen={isUserModalOpen} 
        onClose={() => setIsUserModalOpen(false)} 
        onSave={(newUser) => {
          // Add the new user to the users list
          setUsers(prev => [{
            id: newUser.id,
            name: `${newUser.firstName} ${newUser.lastName}`,
            email: newUser.email,
            role: newUser.role,
            lastLogin: 'Never'
          }, ...prev]);
          
          // Update stats if the user is a customer
          if (stats && newUser.role === 'customer') {
            setStats(prev => ({
              ...prev,
              customers: prev.customers + 1
            }));
          }
        }} 
      />
      
      {isEditRoomModalOpen && (
        <EditRoomModal 
          isOpen={!!isEditRoomModalOpen}
          roomId={isEditRoomModalOpen}
          onClose={() => setIsEditRoomModalOpen(null)}
          onSave={handleRoomUpdate}
          currentRoom={rooms.find(room => room.id === isEditRoomModalOpen)}
        />
      )}

      {isMaintenanceModalOpen && (
        <MaintenanceModal 
          isOpen={!!isMaintenanceModalOpen}
          roomId={isMaintenanceModalOpen}
          onClose={() => setIsMaintenanceModalOpen(null)}
          onSave={handleRoomMaintenance}
          currentRoom={rooms.find(room => room.id === isMaintenanceModalOpen)}
        />
      )}
      
      {isEditBookingModalOpen && (
        <EditBookingModal 
          isOpen={!!isEditBookingModalOpen}
          bookingId={isEditBookingModalOpen}
          onClose={() => setIsEditBookingModalOpen(null)}
          onSave={handleUpdateBooking}
          currentBooking={bookings.find(booking => booking.id === isEditBookingModalOpen)}
        />
      )}
      
      {isEditUserModalOpen && (
        <EditUserModal 
          isOpen={!!isEditUserModalOpen}
          userId={isEditUserModalOpen}
          onClose={() => setIsEditUserModalOpen(null)}
          onSave={handleUpdateUser}
          currentUser={users.find(user => user.id === isEditUserModalOpen)}
        />
      )}
    </div>
  )
}

export default AdminPage