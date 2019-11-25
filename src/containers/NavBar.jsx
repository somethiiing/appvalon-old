import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

import Context from '../Context';

import GameBoardToggleButton from '../components/NavBar/GameBoardToggleButton';
import NavMenu from '../components/NavBar/NavMenu';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  boardButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    marginLeft: '.3rem'
  },
}));

function NavBar(props) {

  const classes = useStyles();

  return (
    <Context.Consumer>
    {context => (
      <div className={classes.nav}>
        <AppBar position="static">
          <Toolbar>
            {context.isInGame && <GameBoardToggleButton />}
            <Typography variant="h6" className={classes.title}>
              {context.pageTitle || 'Appvalon'}
            </Typography>
            <NavMenu />
          </Toolbar>
        </AppBar>
      </div>
    )}
    </Context.Consumer>
  );
}

export default NavBar;
