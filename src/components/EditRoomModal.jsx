import { useState, useEffect } from 'react'

const EditRoomModal = ({ isOpen, onClose, onSave, roomId, currentRoom }) => {
  const [formData, setFormData] = useState({
    name: '',
    type: '',
    price: 0,
    capacity: 1,
    description: '',
    features: []
  })

  // Initialize form data with current room data when modal opens
  useEffect(() => {
    if (currentRoom) {
      setFormData({
        name: currentRoom.name || '',
        type: currentRoom.type || '',
        price: currentRoom.price || 0,
        capacity: currentRoom.capacity || 1,
        description: currentRoom.description || '',
        features: currentRoom.features || []
      })
    }
  }, [currentRoom])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: name === 'price' || name === 'capacity' ? Number(value) : value
    })
  }

  const handleFeatureChange = (e) => {
    const { value, checked } = e.target
    if (checked) {
      setFormData({
        ...formData,
        features: [...formData.features, value]
      })
    } else {
      setFormData({
        ...formData,
        features: formData.features.filter(feature => feature !== value)
      })
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onSave(roomId, formData)
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4">Edit Room</h2>
        
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
              Room Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="type">
              Room Type
            </label>
            <select
              id="type"
              name="type"
              value={formData.type}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            >
              <option value="">Select Room Type</option>
              <option value="standard">Standard</option>
              <option value="deluxe">Deluxe</option>
              <option value="suite">Suite</option>
              <option value="executive">Executive</option>
              <option value="presidential">Presidential</option>
            </select>
          </div>
          
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="price">
              Price per Night ($)
            </label>
            <input
              type="number"
              id="price"
              name="price"
              value={formData.price}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              min="0"
              step="0.01"
              required
            />
          </div>
          
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="capacity">
              Capacity
            </label>
            <input
              type="number"
              id="capacity"
              name="capacity"
              value={formData.capacity}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              min="1"
              max="10"
              required
            />
          </div>
          
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              rows="3"
            />
          </div>
          
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Features
            </label>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <input
                  type="checkbox"
                  id="wifi"
                  value="wifi"
                  checked={formData.features.includes('wifi')}
                  onChange={handleFeatureChange}
                  className="mr-2"
                />
                <label htmlFor="wifi">WiFi</label>
              </div>
              <div>
                <input
                  type="checkbox"
                  id="tv"
                  value="tv"
                  checked={formData.features.includes('tv')}
                  onChange={handleFeatureChange}
                  className="mr-2"
                />
                <label htmlFor="tv">TV</label>
              </div>
              <div>
                <input
                  type="checkbox"
                  id="ac"
                  value="ac"
                  checked={formData.features.includes('ac')}
                  onChange={handleFeatureChange}
                  className="mr-2"
                />
                <label htmlFor="ac">Air Conditioning</label>
              </div>
              <div>
                <input
                  type="checkbox"
                  id="minibar"
                  value="minibar"
                  checked={formData.features.includes('minibar')}
                  onChange={handleFeatureChange}
                  className="mr-2"
                />
                <label htmlFor="minibar">Minibar</label>
              </div>
            </div>
          </div>
          
          <div className="flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded mr-2"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default EditRoomModal