import React from 'react';
import { Link } from 'react-router-dom';
import './Dashboard2.css';

function Navbar({ user }) {
  return (
    <div className="navbar">
      <ul className="router-list">
        <li>
          <Link to="/main" style={{ textDecoration: 'none' }}>
            <h2 className="router">Events</h2>
          </Link>
        </li>
        <li>
          <Link to="/other" style={{ textDecoration: 'none' }}>
            <h2 className="router">Tasks</h2>
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default Navbar;
