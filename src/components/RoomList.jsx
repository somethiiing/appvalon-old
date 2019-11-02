import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import RoomListItem from './RoomListItem';

import socketIOClient from "socket.io-client";
const socket = socketIOClient('http://localhost:5000');

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

function RoomList(props) {

  const classes = useStyles();

  const [values, setValues] = React.useState({
    rooms: []
  });

  socket.on('roomList', data => {setValues({ ...values, 'rooms': data });});
  socket.on('ROOM_CREATED', data => {setValues({ ...values, 'rooms': [...values.rooms, data.roomName] });});

  return (
    <div>
      {values.rooms.map(room => <RoomListItem userName={props.userName} roomName={room} />)}
    </div>
  );
}

export default RoomList;
