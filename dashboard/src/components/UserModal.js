import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { Button } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    width: '400px',
    height: '200px'
  },
  userAvatar: {
    borderRadius: '100%',
    height: '50%',
    width: '50%',
    float: 'right',
    border: '1px solid #fff',
    cursor: 'pointer'
  },
  signOutButton: {
    position: 'absolute',
    bottom: '20px',
    right: '150px',
    margin: '0 auto',
    borderRadius: '50px'
  }
}));

export default function UserModal({ user, signIn }) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const ShowAvatar = () => {
    return (
      <div onClick={handleOpen} style={{ width: '100px' }}>
        <img src={user.photoURL} className={classes.userAvatar} />
      </div>
    );
  };

  return (
    <div>
      {user && <ShowAvatar />}
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500
        }}
      >
        <Fade in={open}>
          <div className={classes.paper} style={{ position: 'relative' }}>
            <div style={{ marginTop: '10px' }}>
              <img
                src={user.photoURL}
                style={{ display: 'inlineBlock', float: 'left', borderRadius: '100%' }}
              />
              <div style={{ display: 'inlineBlock', float: 'right', padding: '5px 20px' }}>
                <h1>{user && user.displayName}</h1>
                <p>{user && user.email}</p>
              </div>
            </div>
            <div>
              <Button
                variant="contained"
                color="secondary"
                onClick={signIn}
                className={classes.signOutButton}
              >
                SignOut
              </Button>
            </div>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}
