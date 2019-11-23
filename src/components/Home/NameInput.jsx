import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';


const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    padding: theme.spacing(1)
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

function NameInput(props) {

  const classes = useStyles();


  return (
    <TextField
      required
      id="name"
      label="Name"
      placeholder="Your real name"
      className={classes.textField}
      value={props.name}
      onChange={props.handleChange('name')}
      margin="normal"
      variant="outlined"
    />
  );
}

export default NameInput;
