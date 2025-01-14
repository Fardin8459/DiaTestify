import React from 'react'
import Footer from './Footer/Footer'
import NavBar from './Navbar/Navbar'
import { Outlet } from 'react-router-dom'
import FloatingIcons from '../FloatingIcons.jsx/FloatingIcons'

const AppLayout = () => {
  return (
    <div>
        <NavBar/>
        <Outlet /> {/* This will render child routes */}
      <FloatingIcons /> {/* Shared FloatingIcons for all child routes */}
      <Footer/>

    </div>
  )
}

export default AppLayout
