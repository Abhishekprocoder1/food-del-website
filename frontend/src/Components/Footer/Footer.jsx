import React from 'react'
import './Footer.css';
import { assets } from '../../assets/assets';
import { Link } from 'react-router-dom'
const Footer = () => {
  return (
    <div className='footer' id='footer' >
      <div className="footer-content">
        <div className="footer-left">
        <Link to='/'> <h1 className='logoicon'>FlavorFusion</h1></Link>
          <p>Welcome to FlavorFusion, where deliciousness meets convenience! Whether you're craving a gourmet meal, comfort food, or something in between, our diverse menu has something for everyone. Enjoy fast, reliable delivery right to your doorstep, making meal times easier and more enjoyable than ever before</p>
          <div className="footer-social-icons">
            <img src={assets.facebook_icon} />
            <img src={assets.twitter_icon} />
            <img src={assets.linkedin_icon} />
          </div>
        </div>
        <div className="footer-center">
          <h2>COMPANY</h2>
          <ul>
            <li>Home</li>
            <li>About us</li>
            <li>Delivery</li>
            <li>Privacy</li>
          </ul>
        </div>
        <div className="footer-right">
          <h2>GET IN TOUCH</h2>
          <ul>
            <li>+91-9262315872</li>
            <li>admin@gmail.com</li>
          </ul>
        </div>
      </div>
      <hr />
      <p className='footer-copyright'>
        Copyright 2024 FlavorFusion-All Right Reserved.
      </p>
    </div>
  )
}

export default Footer