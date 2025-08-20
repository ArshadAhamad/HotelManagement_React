import { useState, useEffect } from 'react'

const Notifications = () => {
  const [notifications, setNotifications] = useState([])

  // This would typically come from a context or state management
  useEffect(() => {
    // For demonstration purposes
    const timer = setTimeout(() => {
      // Example notification
      // addNotification('success', 'Welcome to Bay Palace Hotel!')
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  const addNotification = (type, message) => {
    const id = Date.now()
    setNotifications(prev => [...prev, { id, type, message }])

    // Auto-remove after 5 seconds
    setTimeout(() => {
      removeNotification(id)
    }, 5000)
  }

  const removeNotification = (id) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id))
  }

  if (notifications.length === 0) return null

  return (
    <div className="fixed top-20 right-4 z-50 w-80 space-y-2">
      {notifications.map(notification => {
        // Define styles based on notification type
        let bgColor = 'bg-gray-700'
        let icon = null

        switch (notification.type) {
          case 'success':
            bgColor = 'bg-green-600'
            icon = (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            )
            break
          case 'error':
            bgColor = 'bg-red-600'
            icon = (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            )
            break
          case 'warning':
            bgColor = 'bg-yellow-500'
            icon = (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            )
            break
          case 'info':
            bgColor = 'bg-blue-600'
            icon = (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            )
            break
        }

        return (
          <div 
            key={notification.id} 
            className={`${bgColor} text-white p-4 rounded-lg shadow-lg flex items-start`}
          >
            {icon && <span className="mr-3">{icon}</span>}
            <p className="flex-grow">{notification.message}</p>
            <button 
              onClick={() => removeNotification(notification.id)}
              className="ml-2 text-white hover:text-gray-200 focus:outline-none"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        )
      })}
    </div>
  )
}

export default Notifications