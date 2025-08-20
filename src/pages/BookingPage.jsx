import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'

const BookingPage = () => {
  const [searchParams] = useSearchParams()
  const roomId = searchParams.get('roomId')
  
  const [formData, setFormData] = useState({
    checkIn: '',
    checkOut: '',
    adults: 1,
    children: 0,
    roomType: '',
    specialRequests: ''
  })
  
  const [selectedRoom, setSelectedRoom] = useState(null)
  
  // Mock room data
  const rooms = [
    { id: '1', name: 'Deluxe Ocean View', price: 299 },
    { id: '2', name: 'Premium Suite', price: 499 },
    { id: '3', name: 'Standard Room', price: 199 },
    { id: '4', name: 'Family Suite', price: 599 },
    { id: '5', name: 'Executive Room', price: 349 },
    { id: '6', name: 'Economy Room', price: 149 }
  ]
  
  useEffect(() => {
    // Set minimum check-in date to today
    const today = new Date().toISOString().split('T')[0]
    document.getElementById('checkIn').min = today
    
    // If roomId is provided in URL, pre-select that room
    if (roomId) {
      const room = rooms.find(r => r.id === roomId)
      if (room) {
        setSelectedRoom(room)
        setFormData(prev => ({ ...prev, roomType: room.id }))
      }
    }
  }, [roomId])
  
  // Update min check-out date when check-in date changes
  useEffect(() => {
    if (formData.checkIn) {
      const checkInDate = new Date(formData.checkIn)
      checkInDate.setDate(checkInDate.getDate() + 1)
      const minCheckOut = checkInDate.toISOString().split('T')[0]
      document.getElementById('checkOut').min = minCheckOut
      
      // If check-out date is before new min, reset it
      if (formData.checkOut && new Date(formData.checkOut) <= new Date(formData.checkIn)) {
        setFormData(prev => ({ ...prev, checkOut: '' }))
      }
    }
  }, [formData.checkIn])
  
  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    
    if (name === 'roomType') {
      const room = rooms.find(r => r.id === value)
      setSelectedRoom(room)
    }
  }
  
  const calculateTotal = () => {
    if (!selectedRoom || !formData.checkIn || !formData.checkOut) return 0
    
    const checkIn = new Date(formData.checkIn)
    const checkOut = new Date(formData.checkOut)
    const nights = Math.ceil((checkOut - checkIn) / (1000 * 60 * 60 * 24))
    
    return selectedRoom.price * nights
  }
  
  const handleSubmit = (e) => {
    e.preventDefault()
    // In a real app, this would send the booking data to an API
    console.log('Booking submitted:', { ...formData, totalPrice: calculateTotal() })
    alert('Booking submitted successfully! (This is a demo)')
  }
  
  return (
    <div className="w-[80%] mx-auto align-center flex flex-col items-center mt-40 mb-40">
      <h1 className="text-3xl font-bold mb-6">Book Your Stay</h1>
      
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <form onSubmit={handleSubmit} className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {/* Check-in Date */}
            <div>
              <label htmlFor="checkIn" className="block text-sm font-medium text-gray-700 mb-1">Check-in Date *</label>
              <input
                type="date"
                id="checkIn"
                name="checkIn"
                value={formData.checkIn}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            {/* Check-out Date */}
            <div>
              <label htmlFor="checkOut" className="block text-sm font-medium text-gray-700 mb-1">Check-out Date *</label>
              <input
                type="date"
                id="checkOut"
                name="checkOut"
                value={formData.checkOut}
                onChange={handleInputChange}
                required
                disabled={!formData.checkIn}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
              />
            </div>
            
            {/* Number of Adults */}
            <div>
              <label htmlFor="adults" className="block text-sm font-medium text-gray-700 mb-1">Adults *</label>
              <select
                id="adults"
                name="adults"
                value={formData.adults}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {[1, 2, 3, 4, 5, 6].map(num => (
                  <option key={num} value={num}>{num}</option>
                ))}
              </select>
            </div>
            
            {/* Number of Children */}
            <div>
              <label htmlFor="children" className="block text-sm font-medium text-gray-700 mb-1">Children</label>
              <select
                id="children"
                name="children"
                value={formData.children}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {[0, 1, 2, 3, 4].map(num => (
                  <option key={num} value={num}>{num}</option>
                ))}
              </select>
            </div>
            
            {/* Room Type */}
            <div className="md:col-span-2">
              <label htmlFor="roomType" className="block text-sm font-medium text-gray-700 mb-1">Room Type *</label>
              <select
                id="roomType"
                name="roomType"
                value={formData.roomType}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select a room type</option>
                {rooms.map(room => (
                  <option key={room.id} value={room.id}>
                    {room.name} - ${room.price}/night
                  </option>
                ))}
              </select>
            </div>
            
            {/* Special Requests */}
            <div className="md:col-span-2">
              <label htmlFor="specialRequests" className="block text-sm font-medium text-gray-700 mb-1">Special Requests</label>
              <textarea
                id="specialRequests"
                name="specialRequests"
                value={formData.specialRequests}
                onChange={handleInputChange}
                rows="3"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Any special requests or preferences?"
              ></textarea>
            </div>
          </div>
          
          {/* Booking Summary */}
          {selectedRoom && formData.checkIn && formData.checkOut && (
            <div className="bg-gray-50 p-4 rounded-md mb-6">
              <h3 className="text-lg font-semibold mb-2">Booking Summary</h3>
              <div className="space-y-2">
                <p><span className="font-medium">Room:</span> {selectedRoom.name}</p>
                <p><span className="font-medium">Check-in:</span> {new Date(formData.checkIn).toLocaleDateString()}</p>
                <p><span className="font-medium">Check-out:</span> {new Date(formData.checkOut).toLocaleDateString()}</p>
                <p><span className="font-medium">Guests:</span> {formData.adults} Adults, {formData.children} Children</p>
                <p className="text-xl font-bold">Total: ${calculateTotal()}</p>
              </div>
            </div>
          )}
          
          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-md transition duration-300"
            >
              Complete Booking
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default BookingPage