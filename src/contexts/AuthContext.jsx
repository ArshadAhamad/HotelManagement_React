import { createContext, useState, useContext, useEffect } from 'react'
import users from '../data/users'

// Create the authentication context
const AuthContext = createContext(null)

// Custom hook to use the auth context
export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

// Provider component that wraps the app and makes auth object available to any child component that calls useAuth()
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  
  useEffect(() => {
    // Check if user is logged in from localStorage
    const checkAuthStatus = () => {
      const isAuthenticated = localStorage.getItem('isAuthenticated')
      const userId = localStorage.getItem('userId')
      
      if (isAuthenticated && userId) {
        // Find the user in our dummy data
        const foundUser = users.find(user => user.id === parseInt(userId))
        
        if (foundUser) {
          // Create a user object without the password
          const { password, ...userWithoutPassword } = foundUser
          setUser(userWithoutPassword)
        } else {
          // If user not found, clear localStorage
          localStorage.removeItem('isAuthenticated')
          localStorage.removeItem('userId')
          setUser(null)
        }
      } else {
        setUser(null)
      }
      
      setLoading(false)
    }
    
    checkAuthStatus()
  }, [])
  
  // Login function
  const login = async (email, password) => {
    // In a real app, this would make an API call to authenticate
    // For demo purposes, we'll use our dummy users data
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Find user with matching email and password
        const foundUser = users.find(
          (user) => user.email === email && user.password === password
        )
        
        if (foundUser) {
          // Store authentication state
          localStorage.setItem('isAuthenticated', 'true')
          localStorage.setItem('userId', foundUser.id)
          
          // Create a user object without the password
          const { password, ...userWithoutPassword } = foundUser
          
          setUser(userWithoutPassword)
          resolve(userWithoutPassword)
        } else {
          reject(new Error('Invalid credentials'))
        }
      }, 1000) // Simulate API delay
    })
  }
  
  // Logout function
  const logout = () => {
    localStorage.removeItem('isAuthenticated')
    localStorage.removeItem('userId')
    setUser(null)
  }
  
  // Register function
  const register = async (userData) => {
    // In a real app, this would make an API call to register a new user
    // For demo purposes, we'll just simulate a successful registration
    return new Promise((resolve) => {
      setTimeout(() => {
        // Generate a new unique ID
        const maxId = Math.max(...users.map(user => user.id), 0)
        const newId = maxId + 1
        
        // Create new user
        const newUser = {
          id: newId,
          ...userData,
          role: 'customer' // New registrations are always customers
        }
        
        // In a real app, this would be saved to a database
        // For demo purposes, we'll just add it to our users array in memory
        users.push(newUser)
        
        // Store authentication state
        localStorage.setItem('isAuthenticated', 'true')
        localStorage.setItem('userId', newId)
        
        // Create a user object without the password
        const { password, ...userWithoutPassword } = newUser
        
        setUser(userWithoutPassword)
        resolve(userWithoutPassword)
      }, 1000) // Simulate API delay
    })
  }
  
  // Update user profile
  const updateProfile = async (userData) => {
    // In a real app, this would make an API call to update the user profile
    // For demo purposes, we'll just simulate a successful update
    return new Promise((resolve) => {
      setTimeout(() => {
        const updatedUser = {
          ...user,
          ...userData
        }
        
        setUser(updatedUser)
        resolve(updatedUser)
      }, 1000) // Simulate API delay
    })
  }
  
  // Check if user has a specific role
  const hasRole = (requiredRole) => {
    if (!user) return false
    return user.role === requiredRole
  }
  
  const value = {
    user,
    loading,
    login,
    logout,
    register,
    updateProfile,
    hasRole,
    isAuthenticated: !!user
  }
  
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export default AuthContext