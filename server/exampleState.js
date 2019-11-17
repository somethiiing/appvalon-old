let serverState = {
  rooms: {
    fakeRoom2: {
      roomName: '',
      roomOwner: '',
      status: 'WAITING_FOR_PLAYERS', // steps of where we are VOTE_COUNTING, VOTE_DISPLAY, VOTE_RESULTS, etc, whatever
      missionNum: 0,

      createdAt: Date.now(),
      timer: null,

      // from setup options
      playerCount: 5, // number - from setup
      selectedBoard: 5, // unique board based off of player count - fancy lancelot only - from setup
      selectedRoles: [
        "Merlin",
        "Assassin",
        "Mordred"
      ],
      // players joining
      players: [], // - from players joining

      // from selectedBoard
      boardInfo: {},

      // gameplay stuff
      kingOrder: [], // randomly generated from players aka shuffle players, shift + pop whenever king passes
      rejectedMissionCount: 0, // based off of proposed team voting
      nextHammer: '', // generated from current currentKing + rejectedMissionCount
      proposedTeam: [],
      proposedTeamVote: {},
      questVote: {},

      missionsData: [
        // maybe adding all vote data + who went BUT ONLY FOR DISPLAYING POST GAME
        {status: 'incomplete'},
        {status: 'incomplete'},
        {status: 'incomplete'},
        {status: 'incomplete'},
        {status: 'incomplete'},
      ],

      gameComplete: false
    },
    fakeRoom: {
      roomName: 'someFruit',
      roomOwner: '',
      status: '', // steps of where we are VOTE_COUNTING, VOTE_DISPLAY, VOTE_RESULTS, etc, whatever,
      missionNum: 0,

      // from setup options
      playerCount: 8, // number - from setup
      selectedBoard: null, // unique board based off of player count - fancy lancelot only - from setup
      selectedRoles: [
        "Merlin",
        "Assassin",
        "Mordred"
      ],

      // players joining
      players: [ 'wilson', 'bridget', 'etc', 'etc'], // - from players joining

      // from selectedBoard
      boardInfo: {
        playerCount: 8, // number
        numGood: 5, // number - auto generated based off selectedBoard
        numBad: 3, //number - auto generated based off selectedBoard
        doubleFailRequired: true, // boolean - we always know its on mission 4
        mission1Size: 3,
        mission2Size: 4,
        mission3Size: 4,
        mission4Size: 5,
        mission5Size: 5
      },

      // gameplay stuff
      kingOrder: ['wilson', 'etc'], // randomly generated from players aka shuffle players, shift + pop whenever king passes
      rejectedMissionCount: 1, // based off of proposed team voting
      nextHammer: 'person', // generated from current currentKing + rejectedMissionCount
      proposedTeam: [],
      proposedTeamVote: {},
      proposedTeamVoteResults: '',
      questVote: {},
      questVoteResults: '',

      missionsData: [
        // maybe adding all vote data + who went BUT ONLY FOR DISPLAYING POST GAME
        {status: 'success'},
        {status: 'fail'},
        {status: 'incomplete'},
        {status: 'incomplete'},
        {status: 'incomplete'},
      ],

      gameComplete: false
    },
    someFruit: {}
  },
  players: {
    wilson: {
      name: 'wilson',
      socketInfo: '123123',
      currentRoom: 'fakeRoom'
    },
    bridget: {
      name: 'bridget'
    }
  }
}

/**
  WAITING_FOR_PLAYERS
  GAME_START

  MISSION_ONE_START
  MISSION_ONE_TEAM_PROPOSAL
  READY_FOR_SUBMIT_PROPOSED_TEAM_VOTE
  FINALIZE_PROPOSED_TEAM_VOTE
  SUBMIT_PROPOSED_TEAM_VOTE

    // IF REJECTED:

    UPDATE_HAMMER
    UPDATE_KING
    START_NEXT_PROPOSAL

    // IF APPROVED:

    MISSION_VOTE_BEGIN
    READY_FOR_SUBMIT_MISSION_VOTE
    FINALIZE_MISSION_VOTE
    SUBMIT_MISSION_VOTE

      // ON SUCCESS/FAIL

      UPDATE_MISSIONS
      UPDATE_HAMMER
      UPDATE_KING
      START_NEXT_PROPOSAL

  // IF 3 success or fail:

  EVIL_WINS
  GOOD_WINS

  // IF GOOD WINS:

  BEGIN_ASSASSINATION


*/


/**

WAITING_FOR_PLAYERS

PROPOSING_TEAM
PROPOSED_TEAM_VOTING
FINALIZING_TEAM_VOTING
PROPOSED_TEAM_VOTE_COUNTDOWN
DISPLAY_TEAM_VOTING_RESULTS

MISSION_VOTING
FINALIZING_MISSION_VOTING
DISPLAY_MISSION_RESULTS

GAME_END_EVIL
GAME_END_GOOD
ASSASSINATION
GAME_END_RESULTS





*/
