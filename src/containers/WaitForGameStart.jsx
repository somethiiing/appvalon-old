import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import Context from '../Context';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  container: {
    padding: theme.spacing(1),
  },
}));

function WaitForGameStart(props) {

  const classes = useStyles();

  const context = React.useContext(Context);

  React.useEffect(() => {
    context.setGlobalState({pageTitle: 'Wait for Players'});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Context.Consumer>
    {context => (
      <div className={classes.container}>
        <p><b>Room Name:</b> {context.roomData.roomName}</p>
        <p><b>Roles:</b> {context.displayArray(context.roomData.selectedRoles)}</p>
        <p>{context.roomData.players.length}/{context.roomData.playerCount} Players Joined:</p>
        <ul>
          {context.roomData.players.map( player =>
            (<li>{player}</li>)
          )}
        </ul>
      </div>
    )}
    </Context.Consumer>
  );
}

export default WaitForGameStart;
