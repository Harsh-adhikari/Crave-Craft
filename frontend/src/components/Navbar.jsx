import React, { useEffect, useState } from 'react'
import Modal from './Modal'
import InputForm from './InputForm'
import { NavLink, useLocation, useNavigate } from 'react-router-dom'
import logo from '../assets/logo.png'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()
  
  // Check if user is logged in
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  // Check login status on mount and location change
  useEffect(() => {
    const token = localStorage.getItem("token")
    setIsLoggedIn(!!token)
  }, [location])

  // Scroll to top whenever the route changes
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [location.pathname])

  const handleLogout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    setIsLoggedIn(false)
    navigate("/")
  }

  const handleLoginClick = () => {
    console.log("Login button clicked, opening modal")
    setIsOpen(true)
  }

  // Handler for protected links - PREVENT navigation if not logged in
  const handleProtectedLink = (e) => {
    console.log("Protected link clicked, isLoggedIn:", isLoggedIn)
    if (!isLoggedIn) {
      e.preventDefault() // Stop navigation
      setIsOpen(true) // Open login modal
    }
  }

  return (
    <>
      <header className="navbar-container">
        <div className="navbar-content">
          {/* Logo + Brand Name */}
          <div className="navbar-brand">
            <img src={logo} alt="Crave Craft Logo" className="navbar-logo-img" />
            <h1 className="navbar-logo">Crave Craft</h1>
          </div>
          
          <nav className="navbar-links">
            <NavLink 
              to="/" 
              className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}
            >
              Home
            </NavLink>
            
            <NavLink 
              to="/myRecipe"
              onClick={handleProtectedLink}
              className={({ isActive }) => isActive && isLoggedIn ? "nav-link active" : "nav-link"}
            >
              My Recipe
            </NavLink>
            
            {/* ✅ FIXED: Changed from /favRecipe to /favourites */}
            <NavLink 
              to="/favourites"
              onClick={handleProtectedLink}
              className={({ isActive }) => isActive && isLoggedIn ? "nav-link active" : "nav-link"}
            >
              Favourites
            </NavLink>
            
            {isLoggedIn ? (
              <button onClick={handleLogout} className="nav-link logout-btn">
                Logout
              </button>
            ) : (
              <button onClick={handleLoginClick} className="nav-link logout-btn">
                Login
              </button>
            )}
          </nav>
        </div>
      </header>
      
      {isOpen && (
        <Modal onClose={() => setIsOpen(false)}>
          <InputForm setIsOpen={setIsOpen} />
        </Modal>
      )}
    </>
  )
}