import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
}));

function GameBoard(props) {

  const classes = useStyles();

  return (
    <div className={classes.container}>
    Game Board
    </div>
  );
}

export default GameBoard;
