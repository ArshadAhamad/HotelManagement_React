import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { getActivePromotions, getAllFeatures } from '../services/dataService'

const HomePage = () => {
  const [promotions, setPromotions] = useState([])
  const [features, setFeatures] = useState([])
  const [loading, setLoading] = useState(true)
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const [promosData, featuresData] = await Promise.all([
          getActivePromotions(),
          getAllFeatures()
        ])
        setPromotions(promosData)
        setFeatures(featuresData)
      } catch (error) {
        console.error('Error fetching home page data:', error)
      } finally {
        setLoading(false)
      }
    }
    
    fetchData()
  }, [])
  return (
    <div className="space-y-0">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden -mt-20 w-full">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')] bg-cover bg-center">
          <div className="absolute inset-0 bg-gradient-to-b from-secondary-900/70 to-secondary-900/30"></div>
        </div>
        <div className=" relative text-center text-white z-10 mt-16 w-full px-4">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif font-bold mb-6 leading-tight">
            <span className="block">Experience Luxury</span>
            <span className="block">at Bay Palace</span>
          </h1>
          <p className="text-xl md:text-2xl mb-10 max-w-2xl mx-auto font-light opacity-90">
            Where elegance meets comfort in the heart of Bay City
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-6">
            <Link 
              to="/booking" 
              className="btn-primary text-lg py-3 px-8 rounded-md"
            >
              Book Your Stay
            </Link>
            <Link 
              to="/rooms" 
              className="btn-secondary text-lg py-3 px-8 rounded-md"
            >
              Explore Rooms
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white w-[90%] mx-auto">
        <div className="w-full px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">Experience the Difference</h2>
            <div className="w-24 h-1 bg-primary-600 mx-auto"></div>
            <p className="text-lg text-secondary-600 mt-6 max-w-2xl mx-auto">Discover why our guests choose Bay Palace for their luxury accommodations</p>
          </div>
          
          {loading ? (
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
              {features.map((feature) => (
                <div key={feature.id} className="card hover:-translate-y-2 hover:shadow-xl">
                  <div className="text-primary-600 mb-6">
                    <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={feature.icon} />
                    </svg>
                  </div>
                  <h3 className="text-xl font-serif font-semibold mb-3">{feature.title}</h3>
                  <p className="text-secondary-600">{feature.description}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
{/* Promotional Banner Section */}
      {promotions.length > 0 && (
        <section className="py-16 bg-gradient-to-r from-primary-900 to-primary-600 w-full">
          <div className="w-[90%] mx-auto px-4">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="md:w-1/2 mb-8 md:mb-0 text-white">
                <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">{promotions[0].title}</h2>
                <p className="text-lg mb-6 opacity-90">{promotions[0].description}</p>
                <div className="flex flex-wrap gap-4">
                  <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg">
                    <span className="block text-sm font-medium">Offer Code</span>
                    <span className="text-xl font-bold">{promotions[0].offerCode}</span>
                  </div>
                  <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg">
                    <span className="block text-sm font-medium">Valid Until</span>
                    <span className="text-xl font-bold">{promotions[0].validUntil}</span>
                  </div>
                </div>
                <Link 
                  to="/booking" 
                  className="mt-8 inline-block bg-white text-primary-800 hover:bg-primary-50 font-medium py-3 px-8 rounded-md transition duration-300"
                >
                  Book This Offer
                </Link>
              </div>
              <div className="md:w-1/2 flex justify-center">
                <img 
                  src="https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80" 
                  alt="Luxury Suite Promotion" 
                  className="rounded-lg shadow-2xl max-w-full h-auto max-h-80 object-cover"
                />
              </div>
            </div>
          </div>
        </section>
      )}

      
      {/* Image Gallery Section */}
      <section className="py-20 bg-white w-full">
        <div className="w-full px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">Our Gallery</h2>
            <div className="w-24 h-1 bg-primary-600 mx-auto"></div>
            <p className="text-lg text-secondary-600 mt-6 max-w-2xl mx-auto">Take a visual tour of our luxurious accommodations and amenities</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Gallery Image 1 */}
            <div className="relative overflow-hidden rounded-lg group h-64 md:h-80">
              <img 
                src="https://images.unsplash.com/photo-1578683010236-d716f9a3f461?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" 
                alt="Luxury Suite" 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                <p className="text-white font-medium p-4">Luxury Suite</p>
              </div>
            </div>
            
            {/* Gallery Image 2 */}
            <div className="relative overflow-hidden rounded-lg group h-64 md:h-80">
              <img 
                src="https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" 
                alt="Infinity Pool" 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                <p className="text-white font-medium p-4">Infinity Pool</p>
              </div>
            </div>
            
            {/* Gallery Image 3 */}
            <div className="relative overflow-hidden rounded-lg group h-64 md:h-80">
              <img 
                src="https://images.unsplash.com/photo-1584132967334-10e028bd69f7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" 
                alt="Restaurant" 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                <p className="text-white font-medium p-4">Fine Dining Restaurant</p>
              </div>
            </div>
            
            {/* Gallery Image 4 */}
            <div className="relative overflow-hidden rounded-lg group h-64 md:h-80">
              <img 
                src="https://images.unsplash.com/photo-1540555700478-4be289fbecef?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" 
                alt="Spa" 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                <p className="text-white font-medium p-4">Luxury Spa</p>
              </div>
            </div>
            
            {/* Gallery Image 5 */}
            <div className="relative overflow-hidden rounded-lg group h-64 md:h-80">
              <img 
                src="https://images.unsplash.com/photo-1596436889106-be35e843f974?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" 
                alt="Beach View" 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                <p className="text-white font-medium p-4">Private Beach</p>
              </div>
            </div>
            
            {/* Gallery Image 6 */}
            <div className="relative overflow-hidden rounded-lg group h-64 md:h-80">
              <img 
                src="https://images.unsplash.com/photo-1630660664869-c9d3cc676880?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" 
                alt="Lounge" 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                <p className="text-white font-medium p-4">Executive Lounge</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Testimonials Section */}
      <section className="py-20 bg-secondary-50 w-[90%] mx-auto">
        <div className="w-full px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">Guest Experiences</h2>
            <div className="w-24 h-1 bg-primary-600 mx-auto"></div>
            <p className="text-lg text-secondary-600 mt-6 max-w-2xl mx-auto">What our guests have to say about their stay at Bay Palace</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Testimonial 1 */}
            <div className="card hover:shadow-xl">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full bg-primary-100 flex items-center justify-center text-primary-700 font-bold text-xl mr-4">J</div>
                <div>
                  <h4 className="font-semibold">James Wilson</h4>
                  <p className="text-sm text-secondary-500">Business Traveler</p>
                </div>
              </div>
              <div className="text-yellow-400 flex mb-3">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-secondary-600 italic">"The service at Bay Palace exceeded all my expectations. The staff was attentive and the rooms were immaculate. I'll definitely be returning on my next business trip."</p>
            </div>
            
            {/* Testimonial 2 */}
            <div className="card hover:shadow-xl">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full bg-primary-100 flex items-center justify-center text-primary-700 font-bold text-xl mr-4">S</div>
                <div>
                  <h4 className="font-semibold">Sarah Johnson</h4>
                  <p className="text-sm text-secondary-500">Family Vacation</p>
                </div>
              </div>
              <div className="text-yellow-400 flex mb-3">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-secondary-600 italic">"Our family had an amazing time at Bay Palace. The kids loved the pool, and we appreciated the spacious rooms and convenient location. Perfect for a family getaway!"</p>
            </div>
            
            {/* Testimonial 3 */}
            <div className="card hover:shadow-xl">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full bg-primary-100 flex items-center justify-center text-primary-700 font-bold text-xl mr-4">M</div>
                <div>
                  <h4 className="font-semibold">Michael & Emma</h4>
                  <p className="text-sm text-secondary-500">Honeymoon Stay</p>
                </div>
              </div>
              <div className="text-yellow-400 flex mb-3">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-secondary-600 italic">"We chose Bay Palace for our honeymoon and couldn't have been happier. The romantic suite was perfect, and the staff made our stay truly special with thoughtful touches throughout."</p>
            </div>
          </div>
        </div>
      </section>
      
      
      
      {/* CTA Section */}
      <section className="py-16 bg-primary-900 text-white w-full">
        <div className="w-full px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6">Experience Luxury Today</h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto opacity-90">Book your stay now and enjoy exclusive benefits and special offers</p>
          <Link 
            to="/booking" 
            className="bg-white text-primary-900 hover:bg-primary-50 font-medium py-3 px-8 rounded-md transition duration-300 inline-block"
          >
            Reserve Your Room
          </Link>
        </div>
      </section>
    </div>
  )
}

export default HomePage