import React, { useEffect, useState } from 'react';
import {
  AppBar,
  Toolbar,
  Button,
  Grid,
  Card,
  Typography,
  CssBaseline,
  FormHelperText
} from '@material-ui/core';
import { makeStyles, ThemeProvider } from '@material-ui/core/styles';
import { createMuiTheme } from '@material-ui/core/styles';
import { database } from '../firebase/config';
import EventInput from './EventInput';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#2e3a4d'
    },
    secondary: {
      main: '#fff'
    }
  },
  typography: {
    fontFamily: ['Lato', '-apple-system', 'BlinkMacSystemFont'].join(',')
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
    height: '200px'
  }
});

function Dashboard({ signIn }) {
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

  return (
    <CssBaseline>
      <div style={{ backgroundColor: '#eee', height: '100vh' }}>
        <ThemeProvider theme={theme}>
          <AppBar position="static" color="primary">
            <Toolbar className={classes.toolbarStyle}>
              <Button variant="contained" color="secondary" onClick={() => setShow(!show)}>
                {!show ? 'Add Task' : 'Go Back'}
              </Button>
              <Button variant="contained" color="secondary" onClick={signIn}>
                SignOut
              </Button>
            </Toolbar>
          </AppBar>
          {show ? (
            <EventInput />
          ) : (
            <Grid container spacing={2} className={classes.EventContainer}>
              {Object.keys(events).map((id) => getEventCard(id))}
            </Grid>
          )}
        </ThemeProvider>
      </div>
    </CssBaseline>
  );
}

export default Dashboard;
