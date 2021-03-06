const { shuffle, findNextHammer } = require('./otherUtils');

const gameInstantiation = (state, room) => {
  let { players } = state.rooms[room];
  let kingOrder = shuffle(players.slice(0));
  let nextHammer = findNextHammer(kingOrder);

  let roomData = {
    ...state.rooms[room],
    status: 'PROPOSING_TEAM',
    missionNum: 1,
    kingOrder,
    nextHammer
  }

  return { status: 'GAME_STARTED', roomData };
};

const submitTeamProposal = (state, {room = '', nominationArr = []}) => {
  const roomData = {
    status: 'PROPOSED_TEAM_VOTING',
    proposedTeam: nominationArr.slice(0)
  }

  state.rooms[room] = {
    ...state.rooms[room],
    ...roomData
  }

  return { status: 'TEAM_PROPOSED', state };
}

const proposedTeamVoting = (state, {room = '', player = '', vote = 'REJECT'}) => {
  // vote either SUCCESS or REJECT
  const voteData = {
    ...state.rooms[room].proposedTeamVote,
    [player]: vote
  }

  state.rooms[room].proposedTeamVote = voteData;

  return { status: 'PROPOSED_TEAM_VOTE_REGISTERED', state };
};

const finalizeProposedTeamVoting = (state, { room = '' }) => {
  const voteCount = Object.keys(state.rooms[room].proposedTeamVote).length;
  if (voteCount === state.rooms[room].players.length) {
    state.rooms[room].status = 'PROPOSED_TEAM_VOTE_COUNTDOWN';
    return { status: 'PROPOSED_TEAM_VOTE_COUNTDOWN', state };
  } else {
    return { status: 'NOT_ENOUGH_VOTES', state };
  }
};

const submitProposedTeamVote = (state, { room = '' }) => {
  let voteData = state.rooms[room].proposedTeamVote
  let voteKeys = Object.keys(voteData);
  let rejectCount = 0;
  let approveCount = 0;

  for (let i = 0; i < voteKeys.length; i++) {
    if(voteData[voteKeys[i]] === 'APPROVE') {
      approveCount++;
    }
    if(voteData[voteKeys[i]] === 'REJECT') {
      rejectCount++;
    }
  }

  let voteResults = rejectCount >= approveCount ? 'REJECTED' : 'APPROVED';
  state.rooms[room] = {
    ...state.rooms[room],
    status: 'DISPLAY_TEAM_VOTING_RESULTS',
    proposedTeamVoteResults: voteResults
  }

  return { status: 'DISPLAYING_RESULTS', state }
};

const handlePostProposedTeamVote = (state, room, voteDecision) => {
  let roomData;
  if (voteDecision === 'APPROVED') {
    status = 'START_MISSION_VOTING';
    roomData = {
      ...state.rooms[room],
      status
    };
  } else {
    status = 'START_PROPOSING_TEAM';
    roomData = {
      ...state.rooms[room],
      status,
      rejectedMissionCount: state.rooms[room].rejectedMissionCount + 1
    };
  }
  state.rooms[room] = roomData;

  return { status, state };
}


module.exports = {
  gameInstantiation,
  submitTeamProposal,
  proposedTeamVoting,
  finalizeProposedTeamVoting,
  submitProposedTeamVote,
  handlePostProposedTeamVote
};
