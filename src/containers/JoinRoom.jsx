import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import RoomList from '../components/RoomList';
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


function JoinRoom(props) {
  const classes = useStyles();

  ApiHelpers.getRoomList();

  // TODO add choose your role
  return (
    <div className={classes.container}>
      <h2>Choose a Room to Join</h2>
      <RoomList userName={props.userName} />
    </div>
  );
}

export default JoinRoom;
