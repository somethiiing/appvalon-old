import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

import ApiHelpers from '../helpers/api';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  formControl: {
    margin: theme.spacing(3),
  },
}));

function ProposeTeam(props) {

  const classes = useStyles();

  const [state, setState] = React.useState({});

  React.useEffect(() => {
    mapPropsToState(props);
  }, [props]);

  const mapPropsToState = (props) => {
    let newState = {};
    props.playerList.forEach(p => newState = {...newState, [p]: false});
    setState({ ...state, ...newState});
  }

  const handleChange = name => event => {
    setState({ ...state, [name]: event.target.checked });
  };

  const getProposedTeam = () => {
    return Object.keys(state).filter(p => state[p]);
  };

  const error = getProposedTeam().length !== props.teamSize;

  return (
    <div className={classes.container}>
      <h2>Choose Your Team</h2>
      <FormControl required error={error} component="fieldset" className={classes.formControl}>
        <FormLabel component="legend">{`Choose ${props.teamSize} people for your mission`}</FormLabel>
        <FormGroup>
          {props.playerList.map( player =>
            (<FormControlLabel
              control={<Checkbox checked={state[player] || false} onChange={handleChange(player)} value={player} />}
              label={player} key={player}
            />))}
        </FormGroup>
      </FormControl>
      <Button variant="contained" color="primary" className={classes.button} disabled={error}
        onClick={() => {ApiHelpers.submitTeamProposal(props.roomName, getProposedTeam())}}>
          Finalize Team
      </Button>
    </div>
  );
}

export default ProposeTeam;
