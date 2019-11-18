import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import Context from '../Context';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
}));

function WaitForGameStart(props) {

  const classes = useStyles();

  return (
    <Context.Consumer>
    {context => (
      <div className={classes.container}>
        <h2>Waiting for Players to Join</h2>
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
