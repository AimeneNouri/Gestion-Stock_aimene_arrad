import React, { useState } from 'react'
import './sidebarAdminStyle.css'
import Logo from "../../../img/logo.png"
import { NavLink, useNavigate } from 'react-router-dom'
import ApiCalls from '../../../helpers/ApiCalls'

const Sidebar = () => {
    const [isToggled, setToggle] = useState(true);
    const history = useNavigate();
    const toggleDark = () => {
        setToggle(() => !isToggled);
        document.querySelector("body").classList.toggle("dark");
        localStorage.setItem('mode', JSON.stringify(isToggled ? "dark" : "light"));
    }

    const logout = () => {
        ApiCalls.logout();
        history("/login");
        window.location.reload();
    }
  return (
    <div className="sidebar close">
        <div className='header'>
            <div className="image-text">
                <span className="image">
                    <img src={Logo} alt="_logo" />
                </span>

                <div className="text logo-text">
                    <span className="name">Gestion-Stock</span>
                </div>
            </div>
        </div>

        <div className="menuu-bar">
            <div className="menuu">

                <ul className="menuu-links">
                    <li>
                        <NavLink end to="/admin" className="navLinkItem">
                            <i className='fa fa-home icon' ></i>
                            <span className="text nav-text">Dashboard</span>
                        </NavLink>
                    </li>

                    
                    <li>
                        <NavLink to="/admin/add" className="navLinkItem">
                            <i className='fa fa-heart icon' ></i>
                            <span className="text nav-text">Add</span>
                        </NavLink>
                    </li>

                    <li>
                        <NavLink to="/admin/update" className="navLinkItem">
                            <i className='fa fa-wallet icon' ></i>
                            <span className="text nav-text">Update</span>
                        </NavLink>
                    </li>

                    <li>
                        <NavLink to="/admin/delete" className="navLinkItem">
                            <i className='fa fa-wallet icon' ></i>
                            <span className="text nav-text">Delete</span>
                        </NavLink>
                    </li>

                </ul>
            </div>

            <div className="bottom-content">
                <li onClick={() => logout()} style={{cursor: 'pointer'}}>
                    <div className='navLinkItem'>
                        <i className='fa fa-sign-out-alt icon'></i>
                        <span className="text nav-text">Logout</span>
                    </div>
                </li>

                <li className="mode">
                    <div className="sun-moon">
                        <i className='fa fa-moon icon moon'></i>
                        <i className='fa fa-sun icon sun'></i>
                    </div>
                    <span className="mode-text text">Dark mode</span>

                    <div className="toggle-switch">
                        <span className="switch" onClick={toggleDark}></span>
                    </div>
                </li>
                
            </div>
        </div>

    </div>
  )
}

export default Sidebar

