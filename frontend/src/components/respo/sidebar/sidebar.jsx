import React, { useEffect, useState } from 'react'
import './sidebarRespoStyle.css'
import Logo from "../../../img/logo.png"
import { NavLink } from 'react-router-dom'
import { Link } from 'react-router-dom';

const Sidebar = () => {
    const [isToggled, setToggle] = useState(false); 
    const [text, setText] = useState(""); 
    function handleTextChange(e) {
        setText(e.target.value);
      }

    const toggleDark = () => {
        setToggle(!isToggled);
        document.body.querySelector(".app").classList.toggle("dark");
    }
    return (
        <nav className="sidebarRespo close">
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

                    <li className="search-box">
                        <Link to={"articles/view/"+ text} style={{textDecoration: 'none'}}>
                            <i className='fa fa-search icon' style={{color: '#fa1e4e'}}></i>
                        </Link>
                        
                        <input type="text" placeholder="Recherche..." onChange={handleTextChange} />
                    </li>

                    <ul className="menuu-links">
                        <li>
                            <NavLink end to="/respo" className="LinkItem">
                                <i className='fa fa-home icon' ></i>
                                <span className="text nav-text">Tableau de bord</span>
                            </NavLink>
                        </li>


                        <li>
                            <NavLink to="/respo/articles" className="LinkItem">
                                <i className='fa fa-newspaper icon' ></i>
                                <span className="text nav-text">Articles</span>
                            </NavLink>
                        </li>

                        <li>
                            <NavLink to="/respo/categories" className="LinkItem">
                                <i className='fa fa-list-alt icon' ></i>
                                <span className="text nav-text">Categories</span>
                            </NavLink>
                        </li>

                        <li>
                            <NavLink to="/respo/suppliers" className="LinkItem">
                                <i className='fas fa-industry icon'></i>
                                <span className="text nav-text">Fournisseurs</span>
                            </NavLink>
                        </li>

                        <li>
                            <NavLink to="/respo/clients" className="LinkItem">
                                <i className='fa fa-users icon'></i>
                                <span className="text nav-text">Clients</span>
                            </NavLink>
                        </li>

                        <li>
                            <NavLink to="/respo/commandes" className="LinkItem">
                                <i className='fa fa-bookmark icon' ></i>
                                <span className="text nav-text">Commandes</span>
                            </NavLink>
                        </li>
                    </ul>
                </div>

                <div className="bottom-content">
                    <li>
                        <div className="LinkItem" style={{cursor: 'pointer'}}>
                            <i className='fa fa-sign-out-alt icon'></i>
                            <span className="text nav-text">Se deconnecter</span>
                        </div>
                    </li>

                    <li className="mode">
                        <div className="sun-moon">
                            <i className='fa fa-moon icon moon'></i>
                            <i className='fa fa-sun icon sun'></i>
                        </div>
                        <span className="mode-text text">mode</span>

                        <div className="toggle-switch">
                            <span className="switch" onClick={toggleDark}></span>
                        </div>
                    </li>

                </div>
            </div>

        </nav>
    )
}

export default Sidebar