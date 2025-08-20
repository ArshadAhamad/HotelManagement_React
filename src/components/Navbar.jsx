import { useState, useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false) // Replace with actual auth state
  const [scrolled, setScrolled] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()

  // Handle scroll effect for transparent to solid navbar
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen)
  }

  const handleLogout = () => {
    // Implement logout logic here
    setIsLoggedIn(false)
    navigate('/')
  }

  const isActive = (path) => {
    return location.pathname === path
  }

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled || location.pathname !== '/' ? 'bg-white text-secondary-900 shadow-elegant' : 'bg-transparent text-white'}`}>
      <div className="w-[90%] mx-auto px-4">
        <div className="flex justify-between items-center py-4 md:py-6">
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-2xl md:text-3xl font-serif font-bold">Bay Palace</span>
          </Link>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8 items-center">
            <Link 
              to="/" 
              className={`font-medium transition-colors duration-300 ${isActive('/') ? 'text-primary-600' : 'hover:text-primary-600'}`}
            >
              Home
            </Link>
            <Link 
              to="/rooms" 
              className={`font-medium transition-colors duration-300 ${isActive('/rooms') ? 'text-primary-600' : 'hover:text-primary-600'}`}
            >
              Rooms
            </Link>
            <Link 
              to="/gallery" 
              className={`font-medium transition-colors duration-300 ${isActive('/gallery') ? 'text-primary-600' : 'hover:text-primary-600'}`}
            >
              Gallery
            </Link>
            <Link 
              to="/booking" 
              className={`font-medium transition-colors duration-300 ${isActive('/booking') ? 'text-primary-600' : 'hover:text-primary-600'}`}
            >
              Book Now
            </Link>
            
            {isLoggedIn ? (
              <>
                <Link 
                  to="/profile" 
                  className={`font-medium transition-colors duration-300 ${isActive('/profile') ? 'text-primary-600' : 'hover:text-primary-600'}`}
                >
                  My Profile
                </Link>
                <button 
                  onClick={handleLogout}
                  className="btn-accent"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link 
                to="/login" 
                className="btn-primary"
              >
                Login
              </Link>
            )}
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden">
            <button 
              onClick={toggleMobileMenu}
              className="text-secondary-800 focus:outline-none"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
        
        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 space-y-4 border-t border-secondary-200 animate-fadeIn">
            <Link 
              to="/" 
              className={`block py-2 font-medium ${isActive('/') ? 'text-primary-600' : 'hover:text-primary-600'}`}
              onClick={() => setMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              to="/rooms" 
              className={`block py-2 font-medium ${isActive('/rooms') ? 'text-primary-600' : 'hover:text-primary-600'}`}
              onClick={() => setMobileMenuOpen(false)}
            >
              Rooms
            </Link>
            <Link 
              to="/booking" 
              className={`block py-2 font-medium ${isActive('/booking') ? 'text-primary-600' : 'hover:text-primary-600'}`}
              onClick={() => setMobileMenuOpen(false)}
            >
              Book Now
            </Link>
            
            {isLoggedIn ? (
              <>
                <Link 
                  to="/profile" 
                  className={`block py-2 font-medium ${isActive('/profile') ? 'text-primary-600' : 'hover:text-primary-600'}`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  My Profile
                </Link>
                <button 
                  onClick={() => {
                    handleLogout();
                    setMobileMenuOpen(false);
                  }}
                  className="btn-accent w-full text-center mt-4"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link 
                to="/login" 
                className="btn-primary w-full text-center mt-4 block"
                onClick={() => setMobileMenuOpen(false)}
              >
                Login
              </Link>
            )}
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navbar