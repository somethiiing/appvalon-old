import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

import NumPlayersSelect from '../components/CreateRoom/NumPlayersSelect';
import LancelotCheckbox from '../components/CreateRoom/LancelotCheckbox';
import BoardSizeSelect from '../components/CreateRoom/BoardSizeSelect';
import ApiHelpers from '../helpers/api';

const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

function CreateRoom(props) {

  const classes = useStyles();

  const [values, setValues] = React.useState({
    numPeople: 5,
    isLancelot: false,
    board: 5,
    roomOwner: props.userName
  });

  const handleCheckboxChange = name => event => {
    setValues({ ...values, [name]: event.target.checked });
  };

  const handleSelectChange = name => event => {
    setValues({...values, [name]: event.target.value });
  };

  return (
    <div className={classes.container}>
      <h2>Create A Room</h2>
      <NumPlayersSelect numPeople={values.numPeople} handleChange={handleSelectChange} />
      <LancelotCheckbox isLancelot={values.isLancelot} handleChange={handleCheckboxChange} />
      {values.isLancelot && <BoardSizeSelect board={values.board} handleChange={handleSelectChange} />}
      <Button variant="contained" color="primary" className={classes.button}
        onClick={() => ApiHelpers.createRoom(values)}>
        Submit
      </Button>
    </div>
  );
}

export default CreateRoom;
