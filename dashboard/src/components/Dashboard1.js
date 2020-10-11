import React, { useEffect } from 'react';
import './Dashboard1.css';
import image from '../images/home.svg';
import { Button } from './Button';

function DashboardRaw({ auth, signIn }) {
  useEffect(() => {
    console.log('hello');
  }, [auth]);
  return (
    <>
      <div
        style={{
          background: 'linear-gradient(to top, #a18cd1 0%, #fbc2eb 100%)'
        }}
        className="header"
      >
        <div className="hero-img-wrapper">
          <img src={image} alt="hello" className="hero-img" />
        </div>
        <h1 className="main-heading">DASHBOARD</h1>
        <div className="hero-btn">
          <Button
            buttonSize="btn--wide"
            buttonColor="primary"
            buttonStyle="btn--outline"
            onClick={signIn}
          >
            Get Started
          </Button>
        </div>
      </div>
    </>
  );
}
export default DashboardRaw;
