import React, { useState } from 'react';
import { Container, Typography, TextField, Grid, Button } from '@material-ui/core';
import { makeStyles, ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { database } from '../firebase/config';

const useStyles = makeStyles({
  containerStyle: {
    paddingTop: '50px'
  },
  labelStyles: {
    marginLeft: '20%',
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
      main: '#fff'
    }
  }
});

function EventInput() {
  const classes = useStyles();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [url, seturl] = useState('');

  const onFormSubmit = async () => {
    console.log(title, description, date, url);
    const res = await database.collection('events').add({
      title,
      description,
      date,
      url
    });

    console.log(res);
  };

  return (
    <div>
      <ThemeProvider theme={theme}>
        <Container maxWidth="md" className={classes.containerStyle}>
          <Typography component="div" style={{ backgroundColor: '#fff', height: '65vh' }}>
            <Typography variant="h4" style={{ textAlign: 'center' }}>
              ENTER DETAILS
            </Typography>
            <div className={classes.root}>
              <Grid container spacing={1}>
                <Grid container item xs={12} spacing={3} className={classes.inputContainer}>
                  <Grid item xs={6}>
                    <Typography className={classes.labelStyles}>Title</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      variant="standard"
                      label="Title"
                      className={classes.inputStyles}
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                    />
                  </Grid>
                </Grid>
                <Grid container item xs={12} spacing={3} className={classes.inputContainer}>
                  <Grid item xs={6}>
                    <Typography className={classes.labelStyles}>Description</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      variant="standard"
                      label="Description"
                      className={classes.inputStyles}
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                    />
                  </Grid>
                </Grid>
                <Grid container item xs={12} spacing={3} className={classes.inputContainer}>
                  <Grid item sm={6} xs={5}>
                    <Typography className={classes.labelStyles}>Date</Typography>
                  </Grid>
                  <Grid item sm={6} xs={7}>
                    <TextField
                      type="datetime-local"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      className={classes.inputStyles}
                      label="Date"
                    />
                  </Grid>
                </Grid>
                <Grid container item xs={12} spacing={3} className={classes.inputContainer}>
                  <Grid item xs={6}>
                    <Typography className={classes.labelStyles}>Website</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      variant="standard"
                      label="Website Link"
                      value={url}
                      onChange={(e) => seturl(e.target.value)}
                    />
                  </Grid>
                </Grid>
                <Button variant="contained" style={{ margin: '60px auto' }} onClick={onFormSubmit}>
                  Submit
                </Button>
              </Grid>
            </div>
          </Typography>
        </Container>
      </ThemeProvider>
    </div>
  );
}

export default EventInput;
