import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Toolbar from '@material-ui/core/Toolbar';
import firebase from 'firebase/app';
import 'firebase/auth';
import './App.css';

import Dashboard from './components/Dashboard2';

const useStyles = makeStyles({
  root: {
    flexGrow: 1
  },
  appbar: {},
  title: {
    flexGrow: 1
  },
  loginBtn: {}
});

function App() {
  const classes = useStyles();
  const [auth, setAuth] = React.useState(false);
  React.useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        setAuth(true);
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
        })
        .catch((err) => {
          console.error(err);
        });
    }
  };

  return (
    <div className={classes.root}>
      <div id="main-ui">
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" className={classes.title}>
              Dashboard
            </Typography>
            <Button color="secondary" variant="contained" onClick={signIn}>
              {auth ? 'Sign Out' : 'sign in'}
            </Button>
          </Toolbar>
        </AppBar>
      </div>
      {auth && <Dashboard />}
    </div>
  );
}

export default App;
