import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import Button from '@material-ui/core/Button';

import Context from '../../Context';

const useStyles = makeStyles(theme => ({
  label: {
    flexDirection: 'column'
  },
}));

function GameBoardToggleButton(props) {

  const classes = useStyles();

  return (
    <Context.Consumer>
    {context => (
      <div>
        <Button
          classes={{ root: classes.button, label: classes.label }}
          variant="text"
          disableRipple={true}
          aria-label="toggle game board"
          aria-controls="board-toggle-appbar"
          onClick={context.toggleShouldShowGameBoard}
          color="inherit"
          size='small'
        >
          {context.shouldShowGameBoard ? <VisibilityOffIcon className={classes.icon} /> : <VisibilityIcon className={classes.icon} />}
          Board
        </Button>
      </div>
    )}
    </Context.Consumer>
  );
}

export default GameBoardToggleButton;
