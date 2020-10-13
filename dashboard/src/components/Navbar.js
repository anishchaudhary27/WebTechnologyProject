import React from 'react';
import { Link } from 'react-router-dom';
import './Dashboard2.css';

function Navbar({ user }) {
  return (
    <div className="navbar">
      <ul>
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
        <li>
          {user && (
            <div>
              <p>{user.displayName}</p>
            </div>
          )}
        </li>
      </ul>
    </div>
  );
}

export default Navbar;
