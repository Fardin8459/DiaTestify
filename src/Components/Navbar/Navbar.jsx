import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from "../../assets/abt-img/logo.png";
import './NavBar.css';

const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="navbar">
      <div className="logo-container">
        <img src={logo} alt="Company Logo" className="logo" />
        <h1 className="company-name">
          <font color="#2bb4d4" size="28px">D</font>ia<font color="#2bb4d4">T</font>estify
        </h1>
      </div>
      
      <div className={`menu-toggle ${isMenuOpen ? 'active' : ''}`} onClick={toggleMenu}>
        <div />
        <div />
        <div />
      </div>

      <ul className={`navbar-links ${isMenuOpen ? 'active' : ''}`}>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/about">About</Link></li>
        <li><Link to="/contact">Contact</Link></li>
        <li><Link to="/signUp">SignUp</Link></li>
        <li><Link to="/login">Login</Link></li>
      </ul>
    </nav>
  );
};

export default NavBar;
