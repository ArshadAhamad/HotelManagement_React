import { createContext, useState, useContext, useCallback } from 'react'

// Create the notification context
const NotificationContext = createContext(null)

// Custom hook to use the notification context
export const useNotification = () => {
  const context = useContext(NotificationContext)
  if (!context) {
    throw new Error('useNotification must be used within a NotificationProvider')
  }
  return context
}

// Provider component that wraps the app and makes notification functions available
export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([])
  
  // Generate a unique ID for each notification
  const generateId = () => {
    return Date.now().toString(36) + Math.random().toString(36).substr(2, 5)
  }
  
  // Add a new notification
  const addNotification = useCallback((message, type = 'info', duration = 5000) => {
    const id = generateId()
    
    setNotifications(prev => [
      ...prev,
      { id, message, type, duration }
    ])
    
    // Automatically remove notification after duration
    if (duration > 0) {
      setTimeout(() => {
        removeNotification(id)
      }, duration)
    }
    
    return id
  }, [])
  
  // Remove a notification by ID
  const removeNotification = useCallback((id) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id))
  }, [])
  
  // Shorthand functions for different notification types
  const success = useCallback((message, duration) => {
    return addNotification(message, 'success', duration)
  }, [addNotification])
  
  const error = useCallback((message, duration) => {
    return addNotification(message, 'error', duration)
  }, [addNotification])
  
  const warning = useCallback((message, duration) => {
    return addNotification(message, 'warning', duration)
  }, [addNotification])
  
  const info = useCallback((message, duration) => {
    return addNotification(message, 'info', duration)
  }, [addNotification])
  
  // Clear all notifications
  const clearAll = useCallback(() => {
    setNotifications([])
  }, [])
  
  const value = {
    notifications,
    addNotification,
    removeNotification,
    success,
    error,
    warning,
    info,
    clearAll
  }
  
  return <NotificationContext.Provider value={value}>{children}</NotificationContext.Provider>
}

export default NotificationContext