import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navbar from './Navbar';
import OtherFeature from './Pages/OtherFeature';

import TaskInput2 from './Pages/TaskInput';
import image2 from '../images/about.svg';
import './Dashboard2.css';
import NavbarTop from './NavbarTop';

function Dashboard({ user, signIn }) {
  return (
    <div>
      <div className="background-gradient">
        <Router>
          <NavbarTop user={user} signIn={signIn} />
          <Navbar />

          <Switch>
            <Route path="/" exact component={OtherFeature} />
            <Route path="/main" exact component={TaskInput2} />
            <Route path="/other" exact component={OtherFeature} />
          </Switch>

          {/* <div className="hero-img-wrapper">
          <img src={image2} alt="hello" className="hero-img-2" />
        </div> */}
        </Router>
      </div>
    </div>
  );
}

export default Dashboard;
