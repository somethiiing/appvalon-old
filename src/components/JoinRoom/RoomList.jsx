import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';

import Context from '../../Context';
import RoomListItem from './RoomListItem';

const useStyles = makeStyles(theme => ({
  list: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
  },
}));

function RoomList(props) {

  const classes = useStyles();

  const context = React.useContext(Context);

  const [values, setValues] = React.useState({
    rooms: []
  });

  context.socket.on('GOT_ROOM_LIST', data => {setValues({ ...values, 'rooms': data });});
  context.socket.on('ROOM_CREATED', data => {setValues({ ...values, 'rooms': [...values.rooms, data.roomName] });});

  return (
    <Context.Consumer>
    {context => (
      <List className={classes.list}>
        {values.rooms.map(room => <RoomListItem userName={context.userName} roomName={room} />)}
      </List>
    )}
    </Context.Consumer>
  );
}

export default RoomList;
