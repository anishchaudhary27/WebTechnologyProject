import React from 'react';

function DashboardRaw(auth, setAuth) {
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
    </div>
  );
}

export default DashboardRaw;
