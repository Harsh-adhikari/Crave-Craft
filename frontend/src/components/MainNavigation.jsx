import React from 'react'
import { Outlet } from 'react-router-dom'
import Footer from './Footer'
import Navbar from './Navbar'
import ScrollToTop from './ScrollToTop'; 

export default function MainNavigation() {
  return (
    <>
    <ScrollToTop />
    <Navbar/>
    <Outlet/>
    <Footer/>
    </>
  )
}
