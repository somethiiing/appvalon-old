import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import FormLabel from '@material-ui/core/FormLabel';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

import Context from '../../Context';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  formControl: {
    margin: theme.spacing(3),
  },
}));

function RolesSelect(props) {

  const classes = useStyles();

  const rolesList = [
    { codeName: 'Merlin', displayName: 'Merlin'},
    { codeName: 'Percival', displayName: 'Percival'},
    { codeName: 'Assassin', displayName: 'Assassin'},
    { codeName: 'Morgana', displayName: 'Morgana'},
    { codeName: 'Mordred', displayName: 'Mordred'},
    { codeName: 'Oberon', displayName: 'Oberon'},
    { codeName: 'GenericEvil', displayName: 'Minion of Mordred'},
    { codeName: 'RandomSingleLancelot', displayName: 'Random Single Lancelot', isLancelot: true},
    { codeName: 'EvilLancelot', displayName: 'Evil Lancelot', isLancelot: true},
    { codeName: 'GoodLancelot', displayName: 'Good Lancelot', isLancelot: true}
  ];

  const [state, setState] = React.useState({
    Merlin: true,
    Percival: true,
    Assassin: true,
    Morgana: true,
    Mordred: true,
    Oberon: false,
    GenericEvil: false,
    RandomSingleLancelot: false,
    EvilLancelot: false,
    GoodLancelot: false
  });

  const handleChange = name => event => {
    setState({ ...state, [name]: event.target.checked });
  };

  React.useEffect(() => {
    const chosenRoles = Object.keys(state).filter(r => state[r]);
    props.handleRolesChange(chosenRoles);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state]);

  return (
    <Context.Consumer>
    {context => (
      <div className={classes.container}>
        <FormLabel component="legend">{`Choose the special roles you are using`}</FormLabel>
        <FormGroup>
          {rolesList.map( role => {
            return (role.isLancelot && !props.showLancelots)
            ? (<div></div>)
            : (<FormControlLabel
              control={<Checkbox checked={state[role.codeName] || false} onChange={handleChange(role.codeName)} value={role.codeName} />}
              label={role.displayName} key={role.codeName}
            />)
          })}
        </FormGroup>
      </div>
    )}
    </Context.Consumer>
  );
}

export default RolesSelect;
