import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import firebase from 'firebase/app';
import 'firebase/firestore';

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '25ch'
    }
  }
}));

export default function TaskInput() {
  const classes = useStyles();
  const [value, setValue] = React.useState('');
  const [description, setDescription] = React.useState('');

  const onFormSubmit = () => {
    firebase
      .firestore()
      .collection('tasks')
      .add({
        title: value,
        description: description
      })
      .then(() => {
        console.log('done');
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  return (
    <form className={classes.root} noValidate autoComplete="off" className="header-2">
      <Container maxWidth="sm" style={{ marginTop: 60, backgroundColor: '#eee', padding: 10 }}>
        <div>
          <h3>Input Task</h3>
          <TextField
            id="outlined-multiline-flexible"
            label="Title"
            multiline
            rowsMax={4}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            variant="outlined"
            style={{ backgroundColor: '#e9e9e9' }}
          />
          <TextField
            id="outlined-multiline-static"
            label="description"
            multiline
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            variant="outlined"
            style={{ backgroundColor: '#e9e9e9' }}
          />
          <Button color="primary" variant="contained" onClick={onFormSubmit}>
            submit
          </Button>
        </div>
      </Container>
    </form>
  );
}
