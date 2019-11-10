import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import Context from '../../Context';
import RoomListItem from './RoomListItem';

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

  const context = React.useContext(Context);

  const [values, setValues] = React.useState({
    rooms: []
  });

  context.socket.on('GOT_ROOM_LIST', data => {setValues({ ...values, 'rooms': data });});
  context.socket.on('ROOM_CREATED', data => {setValues({ ...values, 'rooms': [...values.rooms, data.roomName] });});

  return (
    <Context.Consumer>
    {context => (
      <div>
        {values.rooms.map(room => <RoomListItem userName={context.userName} roomName={room} />)}
      </div>
    )}
    </Context.Consumer>
  );
}

export default RoomList;
