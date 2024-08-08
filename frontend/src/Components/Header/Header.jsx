import React from 'react'
import Bgimage from '../../assets/foodbg.png';
import './Header.css'
const Header = () => {
  return (
    <div className='header' id='header' >
      <div className='header__top'>
        <div className="left-content">
          <h1>Order Your<br/> Best Food anytime</h1>
          <p>Hey,Our delicions food is wailting for you <br />
            We are always near to you with fresh item of food
          </p>
        </div>
        <button className='btn'>Explore Food</button>
      </div>
    </div>
  )
}

export default Header