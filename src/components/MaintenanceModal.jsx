import { useState } from 'react'

const MaintenanceModal = ({ isOpen, onClose, onSave, roomId, currentRoom }) => {
  const [issue, setIssue] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    onSave(roomId, issue)
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4">Report Maintenance Issue</h2>
        <p className="mb-4 text-gray-600">
          Room: {currentRoom ? `${currentRoom.id} - ${currentRoom.name}` : ''}
        </p>
        
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="issue">
              Maintenance Issue
            </label>
            <textarea
              id="issue"
              value={issue}
              onChange={(e) => setIssue(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              rows="4"
              placeholder="Describe the maintenance issue..."
              required
            />
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
              className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded"
            >
              Submit Maintenance Request
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default MaintenanceModal