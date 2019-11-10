import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import Context from '../../Context';

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
    <Context.Consumer>
    {context => (
      <button onClick={() => context.joinRoom(props.userName, props.roomName)}>
        {props.roomName}
      </button>
    )}
    </Context.Consumer>
  );
}

export default RoomListItem;
