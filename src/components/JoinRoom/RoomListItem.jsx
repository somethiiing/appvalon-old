import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

import Context from '../../Context';

const useStyles = makeStyles(theme => ({
  listItem: {
    textAlign: 'center',
  },
  primary: {
    fontSize: '1.5rem',
    fontWeight: 500,
    textTransform: 'capitalize',
  },
}));

function RoomListItem(props) {

  const classes = useStyles();

  return (
    <Context.Consumer>
    {context => (
      <ListItem button className={classes.listItem} key={props.roomName} onClick={() => context.joinRoom(props.userName, props.roomName)}>
        <ListItemText classes={classes} primary={props.roomName} />
      </ListItem>
    )}
    </Context.Consumer>
  );
}

export default RoomListItem;
