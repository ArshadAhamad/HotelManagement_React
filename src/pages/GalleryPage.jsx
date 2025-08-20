import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { getGalleryImagesByCategory } from '../services/dataService'

const GalleryPage = () => {
  // State for filtering images
  const [activeFilter, setActiveFilter] = useState('all')
  const [galleryImages, setGalleryImages] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedImage, setSelectedImage] = useState(null)
  
  useEffect(() => {
    const fetchGalleryImages = async () => {
      try {
        setLoading(true)
        const data = await getGalleryImagesByCategory(activeFilter)
        setGalleryImages(data)
      } catch (error) {
        console.error('Error fetching gallery images:', error)
      } finally {
        setLoading(false)
      }
    }
    
    fetchGalleryImages()
  }, [activeFilter])
  
  // Handle filter change
  const handleFilterChange = (filter) => {
    setActiveFilter(filter)
  }
  
  // Categories for filter
  const categories = [
    { id: 'all', name: 'All' },
    { id: 'rooms', name: 'Rooms' },
    { id: 'dining', name: 'Dining' },
    { id: 'spa', name: 'Spa' },
    { id: 'pool', name: 'Pool' },
    { id: 'exterior', name: 'Exterior' }
  ]
  
  // Open image modal
  const openModal = (image) => {
    setSelectedImage(image)
    document.body.style.overflow = 'hidden' // Prevent scrolling when modal is open
  }
  
  // Close image modal
  const closeModal = () => {
    setSelectedImage(null)
    document.body.style.overflow = 'auto' // Re-enable scrolling
  }
  
  // Navigate to previous image
  const navigatePrev = () => {
    if (!selectedImage) return
    
    const currentIndex = galleryImages.findIndex(img => img.id === selectedImage.id)
    const prevIndex = (currentIndex - 1 + galleryImages.length) % galleryImages.length
    setSelectedImage(galleryImages[prevIndex])
  }
  
  // Navigate to next image
  const navigateNext = () => {
    if (!selectedImage) return
    
    const currentIndex = galleryImages.findIndex(img => img.id === selectedImage.id)
    const nextIndex = (currentIndex + 1) % galleryImages.length
    setSelectedImage(galleryImages[nextIndex])
  }
  
  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!selectedImage) return
      
      switch (e.key) {
        case 'ArrowLeft':
          navigatePrev()
          break
        case 'ArrowRight':
          navigateNext()
          break
        case 'Escape':
          closeModal()
          break
        default:
          break
      }
    }
    
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [selectedImage])
  
  return (
    <div className="space-y-8 w-[90%] mx-auto">
      <section className="text-center">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">Our Gallery</h1>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">Explore the beauty and luxury of Bay Palace Hotel through our gallery.</p>
      </section>
      
      {/* Filter Controls */}
      <section className="flex flex-wrap justify-center gap-2">
        {categories.map(category => (
          <button
            key={category.id}
            onClick={() => handleFilterChange(category.id)}
            className={`px-4 py-2 rounded-full ${activeFilter === category.id ? 'bg-blue-600 text-white' : 'bg-gray-200 hover:bg-gray-300'}`}
          >
            {category.name}
          </button>
        ))}
      </section>
      
      {/* Loading State */}
      {loading && (
        <div className="flex justify-center items-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      )}
      
      {/* Gallery Grid */}
      {!loading && (
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {galleryImages.map(image => (
            <div 
              key={image.id} 
              className="relative overflow-hidden rounded-lg shadow-lg cursor-pointer group"
              onClick={() => openModal(image)}
            >
              <img 
                src={image.imageUrl} 
                alt={image.title} 
                className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                <h3 className="text-white text-xl font-bold">{image.title}</h3>
                <p className="text-white/80 text-sm">{image.description}</p>
              </div>
            </div>
          ))}
        </section>
      )}
      
      {/* Image Modal */}
      {selectedImage && (
        <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4">
          <button 
            onClick={closeModal}
            className="absolute top-4 right-4 text-white text-4xl hover:text-gray-300 z-10"
          >
            &times;
          </button>
          <button 
            onClick={navigatePrev}
            className="absolute left-4 text-white text-4xl hover:text-gray-300 z-10"
          >
            &#10094;
          </button>
          <button 
            onClick={navigateNext}
            className="absolute right-4 text-white text-4xl hover:text-gray-300 z-10"
          >
            &#10095;
          </button>
          <div className="max-w-4xl max-h-[80vh] overflow-hidden">
            <img 
              src={selectedImage.imageUrl} 
              alt={selectedImage.title} 
              className="w-full h-auto max-h-[80vh] object-contain"
            />
            <div className="bg-black/50 p-4 text-white">
              <h3 className="text-xl font-bold">{selectedImage.title}</h3>
              <p className="text-sm text-white/80">{selectedImage.description}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default GalleryPage