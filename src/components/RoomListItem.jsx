import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

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
}));

function RoomListItem(props) {

  const classes = useStyles();

  return (
    <button onClick={() => ApiHelpers.joinRoom(props.userName, props.roomName)}>
      {props.roomName}
    </button>
  );
}

export default RoomListItem;
