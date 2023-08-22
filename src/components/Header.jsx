import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import Filter from './Filter';
import "../style/Header.css";

export default function Header({ onCategoryChange }) {
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  return (
    <header className="header">
      <Link to="/">
        <img src="/Logo.png" alt="Feature Flicks Logo" className="logo" />
      </Link>
      <nav className="nav-container">
        <div className="button-container">
          <Link to="/">
            <Button variant="primary" className="home-button">Home</Button>
          </Link>
        </div>
        {isHomePage && <Filter onCategoryChange={onCategoryChange} />}
      </nav>
    </header>
  );
}
