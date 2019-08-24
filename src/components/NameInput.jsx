import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

export default class NameInput extends React.Component {

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


  const classes = useStyles();
  const [values, setValues] = React.useState({
    name: ''
  });

  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value });
  };

  render() {
    return (
      <TextField
        required
        id="outlined-name"
        label="Name"
        placeholder="Your real name"
        className={classes.textField}
        value={values.name}
        onChange={handleChange('name')}
        margin="normal"
        variant="outlined"
      />
    );
  }
}
