import React from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';
import './App.css';
import DashboardRaw from './components/Dashboard1';

import Dashboard from './components/Dashboard2';
import { Button } from './components/Button';

function App() {
  const [auth, setAuth] = React.useState(false);
  const [currentUser, setUser] = React.useState();
  React.useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        setAuth(true);
        setUser(user);
      } else {
        setAuth(false);
      }
    });
  }, []);

  const signIn = () => {
    if (auth) {
      firebase
        .auth()
        .signOut()
        .catch((err) => console.error(err));
    } else {
      var provider = new firebase.auth.GoogleAuthProvider();
      firebase
        .auth()
        .signInWithRedirect(provider)
        .then((value) => {
          console.log('user signed in');
          console.log(value);
        })
        .catch((err) => {
          console.error(err);
        });
    }
  };

  return (
    <div>
      <div className="main">
        <Button
          buttonStyle="btn--primary"
          buttonSize="btn--large"
          buttonColor="primary"
          onClick={signIn}
        >
          {auth ? 'Sign Out' : 'Sign In'}
        </Button>
      </div>
      {auth && <Dashboard user={currentUser} signIn={signIn} />}
      {!auth && <DashboardRaw signIn={signIn} />}
    </div>
  );
}

export default App;
