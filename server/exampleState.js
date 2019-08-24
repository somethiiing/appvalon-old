let serverState = {
  rooms: {
    fakeRoom: {
      roomName: 'someFruit',
      roomOwner: '', 
      status: '', // steps of where we are VOTE_COUNTING, VOTE_DISPLAY, VOTE_RESULTS, etc, whatever,

      // from setup options
      playerCount: 8, // number - from setup
      selectedBoard: null, // unique board based off of player count - fancy lancelot only - from setup

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
      questVote: {},

      missionsData: [
        // maybe adding all vote data + who went BUT ONLY FOR DISPLAYING POST GAME
        {status: 'SUCCESS'},
        {status: 'FAIL'},
        {status: 'INCOMPLETE'},
        {status: 'INCOMPLETE'},
        {status: 'INCOMPLETE'},
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