import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import NativeSelect from '@material-ui/core/NativeSelect';

const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

function NumPlayersSelect(props) {

  const classes = useStyles();

  return (
    <div className={classes.container}>
      <FormControl variant="filled" className={classes.formControl}>
        <InputLabel htmlFor="numPeople">Number of Players</InputLabel>
        <NativeSelect
          native
          value={props.numPeople}
          onChange={props.handleChange('numPeople')}
          inputProps={{
            name: 'numPeople',
            id: 'numPeople',
          }}
        >
          <option value={5}>5</option>
          <option value={6}>6</option>
          <option value={7}>7</option>
          <option value={8}>8</option>
          <option value={9}>9</option>
          <option value={10}>10</option>
          <option value={11}>11</option>
          <option value={12}>12</option>
        </NativeSelect>
      </FormControl>
    </div>
  );
}

export default NumPlayersSelect;
