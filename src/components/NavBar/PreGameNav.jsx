import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles(theme => ({
  nav: {
    display: 'flex',
    width: '100%',
  },
  button: {
    margin: theme.spacing(1),
  },
}));

function PreGameNav(props) {

  const classes = useStyles();

  return (
    <div className={classes.nav}>
      <Button variant="contained" color="primary" className={classes.button}
        onClick={() => {alert("sorry! this button doesn't do shit")}}>
          Change Name
      </Button>
    </div>
  );
}

export default PreGameNav;
