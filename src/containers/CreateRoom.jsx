import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

import Context from '../Context';
import NumPlayersSelect from '../components/CreateRoom/NumPlayersSelect';
import LancelotCheckbox from '../components/CreateRoom/LancelotCheckbox';
import BoardSizeSelect from '../components/CreateRoom/BoardSizeSelect';
import RolesSelect from '../components/CreateRoom/RolesSelect';

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

  const context = React.useContext(Context);

  const [values, setValues] = React.useState({
    numPeople: 5,
    isLancelot: false,
    board: 5,
    selectedRoles: [],
    roomOwner: context.userName
  });

  const handleCheckboxChange = name => event => {
    setValues({ ...values, [name]: event.target.checked });
  };

  const handleSelectChange = name => event => {
    setValues({...values, [name]: event.target.value });
  };

  const handleRolesChange = (roles) => {
    setValues({...values, selectedRoles: roles})
  };

//TODO add 'choose roles in this game', but don't choose your role in join game
  return (
    <Context.Consumer>
    {context => (
      <div className={classes.container}>
        <h2>Create A Room</h2>
        <NumPlayersSelect numPeople={values.numPeople} handleChange={handleSelectChange} />
        <LancelotCheckbox isLancelot={values.isLancelot} handleChange={handleCheckboxChange} />
        {values.isLancelot && <BoardSizeSelect board={values.board} handleChange={handleSelectChange} />}
        <RolesSelect showLancelots={values.isLancelot} handleRolesChange={handleRolesChange} />
        <Button variant="contained" color="primary" className={classes.button}
          onClick={() => context.createRoom(values)}>
          Submit
        </Button>
      </div>
    )}
    </Context.Consumer>
  );
}

export default CreateRoom;
