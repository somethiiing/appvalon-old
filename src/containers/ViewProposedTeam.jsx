import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import Context from '../Context';

const useStyles = makeStyles(theme => ({
}));

function ViewProposedTeam(props) {

  const classes = useStyles();

  return (
    <Context.Consumer>
    {context => (
      <div className={classes.container}>
        <h3>{context.roomData.kingOrder[0]} has proposed: {context.displayArray(context.roomData.proposedTeam)}</h3>
      </div>
    )}
    </Context.Consumer>
  );
}

export default ViewProposedTeam;
