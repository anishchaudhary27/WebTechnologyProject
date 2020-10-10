import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <div>
      <Link to="/main"> Home</Link>
      <Link to="/other"> other</Link>
    </div>
  );
}

export default Navbar;
