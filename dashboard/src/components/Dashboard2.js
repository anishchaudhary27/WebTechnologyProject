import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navbar from './Navbar';
import OtherFeature from './Pages/OtherFeature';
import TaskInput from './Pages/TaskInput';
import image2 from '../images/about.svg';
import './Dashboard2.css';

function Dashboard({ signIn }) {
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route path="/main" exact component={TaskInput} />
        <Route path="/other" exact component={OtherFeature} />
      </Switch>
      <div className="hero-img-wrapper">
        <img src={image2} alt="hello" className="hero-img-2" />
      </div>
    </Router>
  );
}

export default Dashboard;
