import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'
import Footer from './Footer'
import Notifications from './Notifications'

const Layout = () => {
  return (
    <div className="flex flex-col min-h-screen bg-secondary-50">
      <Navbar />
      <Notifications />
      <main className="flex-grow w-full">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

export default Layout