import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

import NameInput from '../components/NameInput';
import APIHelpers from '../helpers/api';

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
  button: {
    margin: theme.spacing(1),
  },
  input: {
    display: 'none',
  },
}));


function Home() {
  const classes = useStyles();
  const [values, setValues] = React.useState({
    name: ''
  });

  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value });
  };

  return (
    <div>
      <NameInput name={values.name} handleChange={handleChange}/>
      // TODO: also navigate to room creation on click
      <Button variant="contained" color="primary" className={classes.button} onClick={() => {APIHelpers.createUser(values.name)}}>
          Create Room
      </Button>
      // TODO: also navigate to room joining on click
      <Button variant="contained" color="primary" className={classes.button} onClick={() => {APIHelpers.createUser(values.name)}}>
          Join Room
      </Button>
    </div>
  );
}

export default Home;
