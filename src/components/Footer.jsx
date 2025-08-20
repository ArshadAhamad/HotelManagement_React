import { Link } from 'react-router-dom'

const Footer = () => {
  const currentYear = new Date().getFullYear()
  
  return (
    <footer className="bg-secondary-900 text-white pt-16 pb-2">
      <div className="w-[90%] mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Hotel Info */}
          <div>
            <h3 className="text-2xl font-serif font-bold mb-6">Bay Palace</h3>
            <p className="mb-2 text-secondary-300">123 Oceanfront Drive</p>
            <p className="mb-2 text-secondary-300">Bay City, BC 12345</p>
            <p className="mb-2 text-secondary-300">Phone: (555) 123-4567</p>
            <p className="text-secondary-300">Email: info@baypalacehotel.com</p>
          </div>
          
          {/* Social Links */}
          <div>
            <h3 className="text-lg font-semibold mb-6 uppercase tracking-wider">Connect With Us</h3>
            <div className="flex space-x-5">
              <a href="#" className="text-secondary-300 hover:text-primary-400 transition-colors duration-300">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                </svg>
              </a>
              <a href="#" className="text-secondary-300 hover:text-primary-400 transition-colors duration-300">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </a>
              <a href="#" className="text-secondary-300 hover:text-primary-400 transition-colors duration-300">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                </svg>
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-6 uppercase tracking-wider">Quick Links</h3>
            <ul className="space-y-3">
              <li><Link to="/" className="text-secondary-300 hover:text-primary-400 transition-colors duration-300">Home</Link></li>
              <li><Link to="/rooms" className="text-secondary-300 hover:text-primary-400 transition-colors duration-300">Rooms & Suites</Link></li>
              <li><Link to="/booking" className="text-secondary-300 hover:text-primary-400 transition-colors duration-300">Book a Room</Link></li>
              <li><Link to="/" className="text-secondary-300 hover:text-primary-400 transition-colors duration-300">Special Offers</Link></li>
            </ul>
          </div>
          
          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-6 uppercase tracking-wider">Our Services</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-secondary-300 hover:text-primary-400 transition-colors duration-300">Luxury Rooms</a></li>
              <li><a href="#" className="text-secondary-300 hover:text-primary-400 transition-colors duration-300">Restaurant</a></li>
              <li><a href="#" className="text-secondary-300 hover:text-primary-400 transition-colors duration-300">Spa & Wellness</a></li>
              <li><a href="#" className="text-secondary-300 hover:text-primary-400 transition-colors duration-300">Conference Rooms</a></li>
            </ul>
          </div>
        </div>
        
        {/* Newsletter */}
        <div className="mt-12">
          <h3 className="text-lg font-semibold mb-6 uppercase tracking-wider">Stay Updated</h3>
          <p className="text-secondary-300 mb-4">Subscribe to our newsletter for exclusive offers and updates</p>
          <div className="flex max-w-md">
            <input 
              type="email" 
              placeholder="Your email" 
              className="bg-secondary-800 text-white px-4 py-2 rounded-l-md focus:outline-none flex-grow"
            />
            <button className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-r-md transition duration-300">
              Subscribe
            </button>
          </div>
        </div>
        
        <div className="border-t border-secondary-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-secondary-400 text-sm">&copy; {currentYear} Bay Palace Hotel. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link to="/" className="text-secondary-400 hover:text-primary-400 text-sm">Privacy Policy</Link>
            <Link to="/" className="text-secondary-400 hover:text-primary-400 text-sm">Terms of Service</Link>
            <Link to="/" className="text-secondary-400 hover:text-primary-400 text-sm">Sitemap</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer