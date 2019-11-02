import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import ApiHelpers from '../helpers/api';

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

function CreateRoom(props) {

  const classes = useStyles();

  return (
    <h2>Create A Room</h2>
  );
}

export default CreateRoom;
