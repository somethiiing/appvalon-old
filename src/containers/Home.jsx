import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

import Context from '../Context';
import NameInput from '../components/Home/NameInput';

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    padding: theme.spacing(1),
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


function Home(props) {
  const classes = useStyles();

  const context = React.useContext(Context);

  React.useEffect(() => {
    context.setGlobalState({pageTitle: 'Appvalon'});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Context.Consumer>
    {context => (
      <div className={classes.container}>
        <NameInput name={context.userName} handleChange={context.handleNameChange}/>
        <Button variant="contained" color="primary" className={classes.button}
          onClick={() => {context.setGlobalState({isCreatingRoom: true}); context.createUser(context.userName)}}>
            Create Room
        </Button>
        <Button variant="contained" color="primary" className={classes.button}
          onClick={() => {context.createUser(context.userName)}}>
            Join Room
        </Button>
      </div>
    )}
    </Context.Consumer>
  );
}

export default Home;
