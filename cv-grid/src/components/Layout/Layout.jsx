import { Outlet } from 'react-router-dom'
import Footer from '../Footer/Footer'
import Navbar from '../Navbar/Navbar'
import './Layout.css'

function Layout() {
  return (
    <div className="app-layout">
      <a className="skip-link" href="#main-content">Skip to main content</a>
      <Navbar />
      <main className="app-layout__content" id="main-content"><Outlet /></main>
      <Footer />
    </div>
  )
}

export default Layout