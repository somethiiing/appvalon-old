import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

import Context from '../../Context';

const useStyles = makeStyles(theme => ({
  nav: {
    display: 'flex',
    width: '100%',
  },
  button: {
    margin: theme.spacing(1),
  },
}));

function GameNav(props) {

  const classes = useStyles();

  return (
    <Context.Consumer>
    {context => (
      <div className={classes.nav}>
        <Button variant="contained" color="primary" className={classes.button}
          onClick={context.toggleShouldShowGameBoard}>
            {context.shouldShowGameBoard ? 'Close Game Board' : 'View Game Board'}
        </Button>
        {(context.userName === context.roomData.roomOwner) &&
          <Button variant="contained" color="secondary" className={classes.button}
            onClick={context.rematch}>
              Rematch
          </Button>
        }
      </div>
    )}
    </Context.Consumer>
  );
}

export default GameNav;
