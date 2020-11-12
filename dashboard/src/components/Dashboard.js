import React, { useEffect, useState } from 'react';
import { AppBar, Toolbar, Button, Grid, Card, Typography, CssBaseline } from '@material-ui/core';
import { makeStyles, ThemeProvider } from '@material-ui/core/styles';
import { createMuiTheme } from '@material-ui/core/styles';
import { database, Auth } from '../firebase/config';
import EventInput from './EventInput';

import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

import UserModal from './UserModal';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#2196f3'
    },
    secondary: {
      main: '#f50057'
    }
  },
  typography: {
    fontFamily: ['Lato', 'sans-serif', '-apple-system', 'BlinkMacSystemFont'].join(',')
  }
});

const useStyles = makeStyles({
  toolbarStyle: {
    display: 'flex',
    justifyContent: 'space-between'
  },
  EventContainer: {
    paddingTop: '20px',
    paddingLeft: '20px',
    paddingRight: '20px'
  },
  cardStyle: {
    height: '200px',
    margin: '8px',
    border: '0.8px solid #e0e0e0',
    textAlign: 'left',
    borderRadius: '4px',
    padding: '5px 8px'
  },
  appBar: {},
  appBarTop: {
    top: 'auto',
    top: 0,
    margin: 0,
    width: '100%'
  },
  grow: {
    flexGrow: 1
  },
  fabButton: {
    position: 'fixed',
    zIndex: 1,
    bottom: 40,
    right: 40
  },
  userAvatar: {
    borderRadius: '100%',
    height: '50%',
    width: '50%',
    float: 'right',
    border: '1px solid #fff'
  },
  divFix: {
    marginTop: '60px'
  }
});

function Dashboard({ signIn, user }) {
  const classes = useStyles();
  const [events, setEvents] = useState({});
  const [show, setShow] = useState(false);
  const [uid, setUid] = useState('');

  useEffect(() => {
    const getdata = async () => {
      const eventsRef = database.collection('events');
      const snapshot = await eventsRef.get();

      let documents = [];
      snapshot.forEach((doc) => {
        documents.push({ ...doc.data() });
      });
      const newData = {};
      documents.forEach((doc, index) => {
        newData[index + 1] = {
          id: index + 1,
          title: doc.title,
          description: doc.description
        };
      });
      setEvents(newData);
      // console.log(events);
    };
    getdata();

    setUid(Auth.currentUser.uid);
  }, [events]);

  const getEventCard = (id) => {
    const { title, description } = events[id];
    return (
      <Grid item sm={4} xs={12} key={id}>
        <Card className={classes.cardStyle}>
          <Typography variant="h4" style={{ textTransform: 'capitalize' }}>
            {title}
          </Typography>
          <Typography variant="h6" style={{ color: 'rgba(0, 0, 0, 0.38)' }}>
            {description}
          </Typography>
        </Card>
      </Grid>
    );
  };

  const ShowAvatar = () => {
    return (
      <div>
        <img src={user.photoURL} className={classes.userAvatar} />
      </div>
    );
  };

  return (
    <CssBaseline>
      <div style={{ backgroundColor: '#fff', height: '100vh', width: '100vw' }}>
        <ThemeProvider theme={theme}>
          <AppBar position="fixed" color="primary" className={classes.appBarTop}>
            <Toolbar className={classes.toolbarStyle}>
              {!show && <Typography variant="h4"> Infotics</Typography>}
              {show && <ArrowBackIcon onClick={() => setShow(!show)} />}
              {user && <UserModal user={user} signIn={signIn} />}
            </Toolbar>
          </AppBar>
          <div className={classes.divFix}>
            {show ? (
              <EventInput uid={uid} />
            ) : (
              <Grid container className={classes.EventContainer}>
                {Object.keys(events).map((id) => getEventCard(id))}
              </Grid>
            )}
            {!show && (
              <Fab
                color="secondary"
                aria-label="add"
                className={classes.fabButton}
                onClick={() => setShow(!show)}
              >
                <AddIcon />
              </Fab>
            )}
          </div>
        </ThemeProvider>
      </div>
    </CssBaseline>
  );
}

export default Dashboard;
