import React, { useEffect, useState } from 'react';
import { AppBar, Toolbar, Button, Grid, Card, Typography, CssBaseline } from '@material-ui/core';
import { makeStyles, ThemeProvider } from '@material-ui/core/styles';
import { createMuiTheme } from '@material-ui/core/styles';
import { database } from '../firebase/config';
import EventInput from './EventInput';

import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#2196f3',
      light: '#eee'
    },
    secondary: {
      main: '#fff'
    }
  },
  typography: {
    fontFamily: ['sans-serif', '-apple-system', 'BlinkMacSystemFont'].join(',')
  }
});

const useStyles = makeStyles({
  toolbarStyle: {
    display: 'flex',
    justifyContent: 'space-between'
  },
  EventContainer: {
    paddingTop: '20px',
    paddingLeft: '50px',
    paddingRight: '50px'
  },
  cardStyle: {
    height: '200px',
    margin: '8px',
    border: '4px solid #eee',
    textAlign: 'center'
  },
  appBar: {
    top: 'auto',
    bottom: 0,
    margin: 0
  },
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
    position: 'absolute',
    zIndex: 1,
    top: -30,
    left: 0,
    right: 0,
    margin: '0 auto'
  },
  userAvatar: {
    borderRadius: '100%',
    height: '50%',
    width: '50%',
    float: 'right',
    border: '1px solid #fff'
  },
  divFix: {
    marginTop: '60px',
    marginBottom: '100px'
  }
});

function Dashboard({ signIn, user }) {
  const classes = useStyles();
  const [events, setEvents] = useState({});
  const [show, setShow] = useState(false);

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
  }, [events]);

  const getEventCard = (id) => {
    const { title, description } = events[id];
    return (
      <Grid item sm={4} xs={12} key={id}>
        <Card className={classes.cardStyle}>
          <Typography variant="h3">{title}</Typography>
          <Typography variant="h6">{description}</Typography>
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
              {user && <ShowAvatar />}
              {/* <Button variant="contained" color="secondary" onClick={signIn}>
                SignOut
              </Button> */}
            </Toolbar>
          </AppBar>
          <div className={classes.divFix}>
            {show ? (
              <EventInput />
            ) : (
              <Grid container className={classes.EventContainer}>
                {Object.keys(events).map((id) => getEventCard(id))}
              </Grid>
            )}
          </div>
          {!show && (
            <AppBar position="fixed" color="primary" className={classes.appBar}>
              <Toolbar>
                <Fab
                  color="secondary"
                  aria-label="add"
                  className={classes.fabButton}
                  onClick={() => setShow(!show)}
                >
                  <AddIcon />
                </Fab>
                <div className={classes.grow} />
              </Toolbar>
            </AppBar>
          )}
        </ThemeProvider>
      </div>
    </CssBaseline>
  );
}

export default Dashboard;
