import React, { useEffect } from 'react';
import './LandingPage.css';
import image from '../images/home.svg';
import { Button } from '@material-ui/core';

function LandingPage({ auth, signIn }) {
  useEffect(() => {}, [auth]);
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
        <h1 className="main-heading">welcome to website header</h1>
        <div className="hero-btn">
          <Button variant="contained" onClick={signIn}>
            Get Started
          </Button>
        </div>
      </div>
    </>
  );
}
export default LandingPage;
