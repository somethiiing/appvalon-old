import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import Context from '../Context';
import PreGameNav from '../components/NavBar/PreGameNav';
import GameNav from '../components/NavBar/GameNav';

const useStyles = makeStyles(theme => ({
  nav: {
    display: 'flex',
    width: '100%',
  },
}));

function NavBar(props) {

  const classes = useStyles();

  return (
    <Context.Consumer>
    {context => (
      <div className={classes.nav}>
        {context.isInGame ? <GameNav /> : <PreGameNav />}
      </div>
    )}
    </Context.Consumer>
  );
}

export default NavBar;
