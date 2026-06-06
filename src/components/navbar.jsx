import React from 'react';
import { useNavigate } from 'react-router-dom';
import './navbar.css';
import logo from '../assets/logo_to_do_sans_bg.png';

function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
    window.location.reload();
  };

  if (!token) {
    return null;
  }

  return (
    <nav className="navbar">
      <div className="logo-title">
        <img src={logo} alt="Logo" className="logo" />
        <h1>To-Do App</h1>
      </div>
      <div className="links">
        <button onClick={handleLogout} className="logout-btn">
          <i className="fas fa-sign-out-alt"></i>Déconnexion
        </button>
      </div>
    </nav>
  );
}

export default Navbar;