import React from 'react';
import { Button } from './Button';
import './NavbarTop.css';

function NavbarTop({ user, signIn }) {
  return (
    <div className="navbar-top">
      <div>
        <ul>
          <li>{user && <p> {user.displayName}</p>}</li>
          <li>
            <Button
              buttonStyle="btn--primary"
              buttonSize="btn--large"
              buttonColor="primary"
              onClick={signIn}
            >
              SignOut
            </Button>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default NavbarTop;
