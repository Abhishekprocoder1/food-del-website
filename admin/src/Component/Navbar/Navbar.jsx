import React from 'react'
import './Navbar.css';
import navlogo from '../../assets/logo.png';
import navprofile from '../../assets/profile_image.png';
const Navbar = () => {
  return (
    <div className='navbar'>
    <img src={navlogo} className='nav-Logo' alt=""/> 
    <img src={navprofile} className='navprofile' alt='' />
   </div>
  )
}

export default Navbar