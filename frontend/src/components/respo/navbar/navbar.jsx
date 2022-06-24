import React from 'react'

const Navbar = () => {
  return (
    <nav className="navbar">
            <div className="nav_icon">
                <i className="fa fa-bars"></i>
            </div>
            <div className="navbar__left">
                
            </div>
            <div className="navbar__right">
                <a >
                    <i className="fa fa-search"></i>
                </a>
            </div>
            <div id="myOverlay" className='overlay'>
                <span className="closebtn"  title="Close Overlay">×</span>
                <div className="overlay-content">
                    <form >
                        <input type="search" placeholder="Search.." name="search"  />
                        <button type="submit"><i className="fa fa-search"></i></button>
                    </form>
                </div>
            </div>
        </nav>
  )
}

export default Navbar