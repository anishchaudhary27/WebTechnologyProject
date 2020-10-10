import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navbar from './Navbar';
import OtherFeature from './Pages/OtherFeature';
import TaskInput from './Pages/TaskInput';

function Dashboard() {
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route path="/main" exact component={TaskInput} />
        <Route path="/other" exact component={OtherFeature} />
      </Switch>
    </Router>
  );
}

export default Dashboard;
