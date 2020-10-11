import React from 'react';
import { Link } from 'react-router-dom';
import './Dashboard2.css';

function Navbar() {
  return (
    <div className="navbar">
      <ul id="routers">
        <li>
          <Link to="/main" style={{ textDecoration: 'none' }}>
            <h1 className="router">Home</h1>
          </Link>
        </li>
        <li>
          <Link to="/other" style={{ textDecoration: 'none' }}>
            <h1 className="router">Router-2</h1>
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default Navbar;
