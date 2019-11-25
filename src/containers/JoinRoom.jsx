import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import Context from '../Context';
import RoomList from '../components/JoinRoom/RoomList';

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    padding: theme.spacing(1),
    width: `100% - ${theme.spacing(1)}`,
  },
}));


function JoinRoom(props) {
  const classes = useStyles();

  const context = React.useContext(Context);

  React.useEffect(() => {
    context.setGlobalState({pageTitle: 'Join Room'});
    context.getRoomList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // TODO add choose your role
  return (
    <Context.Consumer>
    {context => (
      <div className={classes.container}>
        <RoomList userName={context.userName} />
      </div>
    )}
    </Context.Consumer>
  );
}

export default JoinRoom;
