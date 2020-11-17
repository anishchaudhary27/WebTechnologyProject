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

import clsx from 'clsx';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import { red } from '@material-ui/core/colors';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#2196f3'
    },
    secondary: {
      main: '#f50057'
    },
    background: {
      default: '#e1f5fe'
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
  },
  root: {
    maxWidth: 345
  },
  media: {
    height: 0,
    paddingTop: '56.25%' // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest
    })
  },
  expandOpen: {
    transform: 'rotate(180deg)'
  },
  avatar: {
    backgroundColor: red[500]
  }
});

function Dashboard({ signIn, user }) {
  const classes = useStyles();
  const [events, setEvents] = useState({});
  const [show, setShow] = useState(false);
  const [uid, setUid] = useState('');
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  useEffect(() => {
    setUid(Auth.currentUser.uid);
    let dataItems = [];

    const getdata = async () => {
      if (uid != '') {
        const user = database.collection('users').doc(uid);
        const listOfEvents = await user.get();
        dataItems = listOfEvents.data().events;
      }

      const eventsRef = database.collection('events');
      const snapshot = await eventsRef.get();

      let documents = [];
      snapshot.forEach((doc) => {
        dataItems.forEach((e) => parseInt(e));

        if (dataItems.length != 0 && dataItems.includes(doc.id)) {
          documents.push({ ...doc.data() });
        }
      });
      const newData = {};
      documents.forEach((doc, index) => {
        newData[index + 1] = {
          id: index + 1,
          title: doc.title,
          description: doc.description,
          date: doc.date,
          image: doc.image
        };
      });
      setEvents(newData);
      // console.log(events);
    };
    getdata();
  }, [events]);

  const getEventCard = (id) => {
    const { title, description, date, image } = events[id];
    return (
      <Grid item sm={3} xs={12} key={id}>
        <Card className={classes.cardStyle}>
          <CardHeader title={title} subheader={date} style={{ textTransform: 'uppercase' }} />
          <CardMedia className={classes.media} image={image} title={title} />
          <CardContent>
            <Typography
              variant="body2"
              color="textSecondary"
              component="p"
              style={{ height: '100px', overflowY: 'scroll' }}
            >
              {description}
            </Typography>
          </CardContent>
          {/* <CardActions disableSpacing>
            <IconButton
              className={clsx(classes.expand, {
                [classes.expandOpen]: expanded
              })}
              onClick={handleExpandClick}
              aria-expanded={expanded}
              aria-label="show more"
            >
              <ExpandMoreIcon />
            </IconButton>
          </CardActions>
          <Collapse in={expanded} timeout="auto" unmountOnExit>
            <CardContent>
              <Typography paragraph>Method:</Typography>
              <Typography paragraph>{description}</Typography>
            </CardContent>
          </Collapse> */}
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
    <ThemeProvider theme={theme}>
      <CssBaseline>
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
      </CssBaseline>
    </ThemeProvider>
  );
}

export default Dashboard;
