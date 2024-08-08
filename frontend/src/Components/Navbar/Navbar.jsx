import React, { useContext, useState, useEffect } from 'react';
import './Navbar.css';
import { assets } from '../../assets/assets';
import { Link, useNavigate } from 'react-router-dom'
import { StoreContext } from '../../ContextApi/ShopContext';
import { HashLink } from 'react-router-hash-link';
const Navbar = ({ setShow }) => {
    const [menu, setMenu] = useState('home');
    const { getTotalAmount, token, setToken } = useContext(StoreContext);
    const naviGate = useNavigate();
    const logOut = () => {
        localStorage.removeItem('token');
        setToken("");
        naviGate("/")
    }

    // scrollerbar added
    const [scrolled, setScrolled] = useState(false);
    useEffect(() => {
        const onScroll = () => {
            if (window.scrollY > 50) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        }

        window.addEventListener("scroll", onScroll);

        return () => window.removeEventListener("scroll", onScroll);
    }, [])

    const onUpdateActiveLink = (value) => {
        setMenu(value);
    }



    return (
        <div className='navbar'  >
            <Link to='/'> <h1 className='logoicon'>FlavorFusion</h1></Link>
            <ul className='navbar-menu'>
                <HashLink to='#header'>
                    <li
                        onClick={() => onUpdateActiveLink('home')}
                        className={menu === 'home' ? 'active' : ''}
                    >
                        HOME
                    </li>
                </HashLink>

                <HashLink to="#explore-menu">
                    <li
                        onClick={() => onUpdateActiveLink('menu')}
                        className={menu === 'menu' ? 'active' : ''}
                    >
                        MENU
                    </li>
                </HashLink>

                <HashLink to="#app-download">
                    <li
                        onClick={() => onUpdateActiveLink('mobile-app')}
                        className={menu === 'mobile-app' ? 'active' : ''}
                    >
                        MOBILE APP
                    </li>
                </HashLink>

                <HashLink to="#footer">
                    <li
                        onClick={() => onUpdateActiveLink('contact-us')}
                        className={menu === 'contact-us' ? 'active' : ''}
                    >
                        CONTACT US
                    </li>
                </HashLink>

            </ul>
            <div className='navbar-right'>
                <img src={assets.search_icon} alt='search icon' />
                <div className='navbar-search-icon'>
                    <Link to="/cart"><img src={assets.basket_icon} alt='basket icon' /></Link>
                    <div className={getTotalAmount() === 0 ? "" : "dot"}></div>
                </div>
                {!token ? <button onClick={() => setShow(true)}>Sign In</button>
                    : <div className='Navbar-profile' >
                        <img src={assets.profile_icon} alt='' />
                        <div className="nav-profile-drop-down">
                            <li onClick={() => naviGate("/myorders")}><img src={assets.bag_icon} alt='' /><p>Orders</p></li>
                            <hr />
                            <li onClick={logOut}><img src={assets.logout_icon} alt='' />Logout</li>
                        </div>

                    </div>
                }

            </div>
        </div>
    );
};

export default Navbar;
