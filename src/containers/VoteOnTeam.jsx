import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';

import Context from '../Context';

const useStyles = makeStyles(theme => ({
  toggleContainer: {
    margin: theme.spacing(2, 0),
    // width: '100%',
  },
  root: {
    color: 'rgba(0, 0, 0, .8)',
    width: '50vw',
    height: '50vh',
  },
  approve: {
    backgroundColor: 'rgba(0, 111, 194, .5)',
    '&:hover': {
      backgroundColor: 'rgba(0, 111, 194, .7)',
    },
    '&.Mui-selected': {
      backgroundColor: 'rgba(0, 111, 194, 1)',
      color: 'white',
      '&:hover': {
        backgroundColor: 'rgba(0, 111, 194, .8)',
      },
    },
  },
  reject: {
    backgroundColor: 'rgba(255, 73, 73, .5)',
    '&:hover': {
      backgroundColor: 'rgba(255, 73, 73, .7)',
    },
    '&.Mui-selected': {
      backgroundColor: 'rgba(255, 73, 73, 1)',
      color: 'white',
      '&:hover': {
        backgroundColor: 'rgba(255, 73, 73, .8)',
      },
    },
  },
}));

function VoteOnTeam(props) {

  const classes = useStyles();

  const context = React.useContext(Context);

  const [vote, setVote] = React.useState(null);

   const handleChange = (event, newVote) => {
     setVote(newVote);
     context.voteOnProposedTeam(context.roomData.roomName, context.userName, newVote)
   };

   const renderKingContent = (context) => {
     const votesReady = props.numVotesReady === context.roomData.playerCount;
     return (
       <div>
         <Button variant="outlined" className={classes.button}
           onClick={() => {alert('should set status to START_PROPOSING_TEAM')}}>
             Change Team
         </Button>
         <p>{props.numVotesReady}/{context.roomData.players.length} Votes Ready</p>
         <Button variant="contained" color="primary" className={classes.button}
          disabled={!votesReady}
          onClick={() => {context.finalizeProposedTeamVoting(context.roomData.roomName)}}>
            Finalize Votes
         </Button>
       </div>
     );
   }

  return (
    <Context.Consumer>
    {context => (
      <div className={classes.container}>
        <h3>{context.roomData.kingOrder[0]} has proposed: {context.displayArray(context.roomData.proposedTeam)}</h3>
        <div className={classes.toggleContainer}>
          <ToggleButtonGroup
            value={vote}
            exclusive
            onChange={handleChange}
            aria-label="vote"
            fullWidth
          >
            <ToggleButton className={`${classes.approve} ${classes.root}`} value="APPROVE" aria-label="approve" selected={vote === 'APPROVE'}>
              <div>Approve</div>
            </ToggleButton>
            <ToggleButton className={`${classes.reject} ${classes.root}`} value="REJECT" aria-label="reject" selected={vote === 'REJECT'}>
              <div>Reject</div>
            </ToggleButton>
          </ToggleButtonGroup>
        </div>
        {context.isKing && renderKingContent(context)}
      </div>
    )}
    </Context.Consumer>
  );
}

export default VoteOnTeam;
