import React from 'react';
import { Button } from './Button';
import './NavbarTop.css';

function NavbarTop({ user, signIn }) {
  return (
    <div className="navbar-top">
      <div id="items">
        <ul>
          <li className="userName">{user && <h2> {user.displayName}</h2>}</li>
          <li>
            <Button
              buttonStyle="btn--primary"
              buttonSize="btn--large"
              buttonColor="primary"
              onClick={signIn}
              className="signOut-btn"
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
