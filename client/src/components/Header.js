import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import '../styles/Header.css'; 

const Header = () => {
  const [showLogout, setShowLogout] = useState(false);
  const navigate = useNavigate();

  const handleIconClick = () => {
    setShowLogout(!showLogout);
  };

  const handleLogout = () => {
    // Clear the token and navigate to the login page
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <header className="app-header">
      <div className="header-left">
        <h1>Book Exchange Portal</h1>
      </div>
      <nav className="header-nav">
        <NavLink exact to="/" activeClassName="active-tab" className="nav-tab">
          Home
        </NavLink>
        <NavLink to="/my-books" activeClassName="active-tab" className="nav-tab">
          My Books
        </NavLink>
        <NavLink to="/my-requests" activeClassName="active-tab" className="nav-tab">
          Requests
        </NavLink>
        <NavLink to="/requests" activeClassName="active-tab" className="nav-tab">
          Track My Requests
        </NavLink>
      </nav>
      <div className="header-right">
        <div className="user-icon" onClick={handleIconClick}>
          <i className="fas fa-user-circle"></i>
        </div>
        {showLogout && (
          <div className="logout-button" onClick={handleLogout}>
            Log Out
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
