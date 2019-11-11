let testing1 = {
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
};

module.exports = {
  testing1
}
