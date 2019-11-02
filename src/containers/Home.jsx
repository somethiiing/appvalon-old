import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

import NameInput from '../components/Home/NameInput';
import ApiHelpers from '../helpers/api';

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  dense: {
    marginTop: theme.spacing(2),
  },
  menu: {
    width: 200,
  },
  button: {
    margin: theme.spacing(1),
  },
  input: {
    display: 'none',
  },
}));


function Home(props) {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <NameInput name={props.userName} handleChange={props.handleNameChange}/>
      <Button variant="contained" color="primary" className={classes.button}
        onClick={() => {props.setCreatingRoom(true); ApiHelpers.createUser(props.userName)}}>
          Create Room
      </Button>
      <Button variant="contained" color="primary" className={classes.button}
        onClick={() => {ApiHelpers.createUser(props.userName)}}>
          Join Room
      </Button>
    </div>
  );
}

export default Home;
