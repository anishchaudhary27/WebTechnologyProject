import React from 'react';
import firebase from 'firebase/app';
import { Auth } from './firebase/config';
import './App.css';
import LandingPage from './components/LandingPage';
import Dashboard from './components/Dashboard';

function App() {
  const [auth, setAuth] = React.useState(false);
  const [currentUser, setUser] = React.useState();

  React.useEffect(() => {
    Auth.onAuthStateChanged((user) => {
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
      Auth.signOut().catch((err) => console.error(err));
    } else {
      setAuth(true);
      var provider = new firebase.auth.GoogleAuthProvider();
      Auth.signInWithRedirect(provider)
        .then((value) => {
          console.log('user signed in');
        })
        .catch((err) => {
          console.error(err);
        });
    }
  };

  return (
    <div>
      {auth && <Dashboard user={currentUser} signIn={signIn} />}
      {!auth && <LandingPage signIn={signIn} />}
    </div>
  );
}

export default App;
