import React, { useState } from 'react';
import { Container, Typography, TextField, Grid, Button, Chip } from '@material-ui/core';
import { makeStyles, ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { database } from '../firebase/config';
import firebase from 'firebase/app';

import DropzoneDialogExample from './Dropzone';
import DoneIcon from '@material-ui/icons/Done';

const useStyles = makeStyles({
  containerStyle: {
    marginTop: '80px',
    border: '1px solid #e0e0e0'
  },
  labelStyles: {
    marginLeft: '5%',
    position: 'absolute',
    bottom: 0,
    paddingTop: '6px',
    paddingBottom: '20px'
  },
  inputContainer: {
    position: 'relative',
    marginTop: '4%'
  },
  inputStyles: {}
});

const theme = createMuiTheme({
  root: {
    flexGrow: 1
  },
  palette: {
    primary: {
      main: '#2196f3'
    },
    secondary: {
      main: '#f50057'
    }
  },
  typography: {
    fontFamily: ['sans-serif', '-apple-system', 'BlinkMacSystemFont'].join(',')
  }
});

function EventInput({ uid }) {
  const classes = useStyles();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [url, seturl] = useState('');
  const [error, setError] = useState(false);
  const [image, setImage] = useState('');

  const SuccessChip = () => {
    return (
      <Chip
        label="Event Added Successfully"
        deleteIcon={<DoneIcon />}
        variant="outlined"
        style={{ backgroundColor: '#76ff03' }}
      />
    );
  };

  const onFormSubmit = async () => {
    setError(true);
    console.log(title, description, date, url);

    if (title === '' || description === '' || date === '' || url === '') {
      setError(false);
      return;
    }

    const res = await database.collection('events').add({
      title,
      description,
      date,
      url,
      image
    });

    const usersRef = database.collection('users');

    usersRef
      .doc(uid)
      .get()
      .then((docSnapshot) => {
        if (docSnapshot.exists) {
          const query = usersRef.doc(uid).update({
            events: firebase.firestore.FieldValue.arrayUnion(res.id)
          });
        } else {
          usersRef.doc(uid).set({ events: [] });
          const query = usersRef.doc(uid).update({
            events: firebase.firestore.FieldValue.arrayUnion(res.id)
          });
        }
      });

    // console.log(uid);
    setError(false);
  };

  return (
    <div>
      <ThemeProvider theme={theme}>
        <Container
          maxWidth="md"
          className={classes.containerStyle}
          style={{ backgroundColor: '#fff' }}
        >
          <Typography component="div" style={{ height: '75vh', marginTop: '10px' }}>
            <Typography variant="h4" style={{ textAlign: 'center' }}>
              ENTER DETAILS
            </Typography>
            <div className={classes.root}>
              <Grid container spacing={1}>
                <Grid container item xs={12} spacing={3} className={classes.inputContainer}>
                  <Grid item xs={4}>
                    <Typography className={classes.labelStyles}>Title</Typography>
                  </Grid>
                  <Grid item xs={8}>
                    <TextField
                      variant="standard"
                      label="Title"
                      className={classes.inputStyles}
                      value={title}
                      fullWidth
                      onChange={(e) => setTitle(e.target.value)}
                    />
                  </Grid>
                </Grid>
                <Grid container item xs={12} spacing={3} className={classes.inputContainer}>
                  <Grid item xs={4}>
                    <Typography className={classes.labelStyles}>Description</Typography>
                  </Grid>
                  <Grid item xs={8}>
                    <TextField
                      variant="standard"
                      label="Description"
                      className={classes.inputStyles}
                      value={description}
                      fullWidth
                      onChange={(e) => setDescription(e.target.value)}
                    />
                  </Grid>
                </Grid>
                <Grid container item xs={12} spacing={3} className={classes.inputContainer}>
                  <Grid item sm={4} xs={4}>
                    <Typography className={classes.labelStyles}>Date</Typography>
                  </Grid>
                  <Grid item sm={8} xs={8}>
                    <TextField
                      type="datetime-local"
                      value={date}
                      fullWidth
                      onChange={(e) => setDate(e.target.value)}
                      className={classes.inputStyles}
                      label=" "
                    />
                  </Grid>
                </Grid>
                <Grid container item xs={12} spacing={3} className={classes.inputContainer}>
                  <Grid item xs={4}>
                    <Typography className={classes.labelStyles}>Website</Typography>
                  </Grid>
                  <Grid item xs={8}>
                    <TextField
                      type="url"
                      variant="standard"
                      label="Website Link"
                      fullWidth
                      value={url}
                      onChange={(e) => seturl(e.target.value)}
                    />
                  </Grid>
                </Grid>
                <Grid container item xs={12} spacing={3} className={classes.inputContainer}>
                  <Grid item xs={4}>
                    <Typography className={classes.labelStyles}>Upload image</Typography>
                  </Grid>
                  <Grid item xs={8}>
                    {/* {<Button>Upload</Button>} */}
                    {/* <DropzoneDialogExample /> */}
                    <TextField
                      type="url"
                      variant="standard"
                      label="ImageLink"
                      fullWidth
                      value={image}
                      onChange={(e) => setImage(e.target.value)}
                    />
                  </Grid>
                </Grid>
                <Button
                  variant="contained"
                  color="secondary"
                  style={{ margin: '60px auto', borderRadius: '50px', padding: '12px 20px' }}
                  onClick={onFormSubmit}
                >
                  Submit
                </Button>
              </Grid>
            </div>
          </Typography>
        </Container>
        {error && <SuccessChip />}
      </ThemeProvider>
    </div>
  );
}

export default EventInput;
