import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { getRoomsByType } from '../services/dataService'

const RoomsPage = () => {
  const [filter, setFilter] = useState('all')
  const [rooms, setRooms] = useState([])
  const [loading, setLoading] = useState(true)
  
  useEffect(() => {
    const fetchRooms = async () => {
      try {
        setLoading(true)
        const data = await getRoomsByType(filter)
        setRooms(data)
      } catch (error) {
        console.error('Error fetching rooms:', error)
      } finally {
        setLoading(false)
      }
    }
    
    fetchRooms()
  }, [filter])
  
  const handleFilterChange = (newFilter) => {
    setFilter(newFilter)
  }
  
  return (
    <div className="space-y-8 w-[90%] mx-auto">
      <section className="text-center">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">Our Rooms & Suites</h1>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">Discover the perfect accommodation for your stay at Bay Palace Hotel.</p>
      </section>
      
      {/* Filter Controls */}
      <section className="flex justify-center space-x-4">
        <button 
          onClick={() => handleFilterChange('all')}
          className={`px-4 py-2 rounded-full ${filter === 'all' ? 'bg-blue-600 text-white' : 'bg-gray-200 hover:bg-gray-300'}`}
        >
          All Rooms
        </button>
        <button 
          onClick={() => handleFilterChange('standard')}
          className={`px-4 py-2 rounded-full ${filter === 'standard' ? 'bg-blue-600 text-white' : 'bg-gray-200 hover:bg-gray-300'}`}
        >
          Standard
        </button>
        <button 
          onClick={() => handleFilterChange('deluxe')}
          className={`px-4 py-2 rounded-full ${filter === 'deluxe' ? 'bg-blue-600 text-white' : 'bg-gray-200 hover:bg-gray-300'}`}
        >
          Deluxe
        </button>
        <button 
          onClick={() => handleFilterChange('suite')}
          className={`px-4 py-2 rounded-full ${filter === 'suite' ? 'bg-blue-600 text-white' : 'bg-gray-200 hover:bg-gray-300'}`}
        >
          Suites
        </button>
      </section>
      
      {/* Loading State */}
      {loading && (
        <div className="flex justify-center items-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      )}
      
      {/* Room Cards */}
      {!loading && (
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {rooms.map(room => (
          <div key={room.id} className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="h-48 bg-gray-300 flex items-center justify-center">
              <span className="text-gray-500">Room Image</span>
            </div>
            <div className="p-6">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-xl font-bold">{room.name}</h3>
                <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded">
                  {room.type.charAt(0).toUpperCase() + room.type.slice(1)}
                </span>
              </div>
              <p className="text-gray-600 mb-4">{room.description}</p>
              
              <div className="mb-4">
                <h4 className="text-sm font-semibold text-gray-700 mb-2">Room Features:</h4>
                <ul className="grid grid-cols-2 gap-x-2 gap-y-1">
                  {room.features.map((feature, index) => (
                    <li key={index} className="text-sm text-gray-600 flex items-center">
                      <svg className="w-4 h-4 text-green-500 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="flex justify-between items-center">
                <div>
                  <span className="text-2xl font-bold">${room.price}</span>
                  <span className="text-gray-600"> / night</span>
                </div>
                <Link 
                  to={`/booking?roomId=${room.id}`}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded transition duration-300"
                >
                  Book Now
                </Link>
              </div>
            </div>
          </div>
        ))}
      </section>
      )}
    </div>
  )
}

export default RoomsPage