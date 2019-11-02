import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

function LancelotCheckbox(props) {

  const classes = useStyles();

  return (
    <div className={classes.container}>
      <FormControlLabel
        control={
          <Checkbox
            checked={props.isLancelot}
            onChange={props.handleChange('isLancelot')}
            value="isLancelot"
            color="primary"
          />
        }
        label="Include Lancelot(s)"
      />
    </div>
  );
}

export default LancelotCheckbox;
