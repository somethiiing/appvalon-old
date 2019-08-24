const defaultRoomObject = {
  roomName: '',
  roomOwner: '',
  status: 'WAITING_FOR_PLAYERS', // steps of where we are VOTE_COUNTING, VOTE_DISPLAY, VOTE_RESULTS, etc, whatever

  // from setup options
  playerCount: 5, // number - from setup
  selectedBoard: 5, // unique board based off of player count - fancy lancelot only - from setup

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
    {status: 'INCOMPLETE'},
    {status: 'INCOMPLETE'},
    {status: 'INCOMPLETE'},
    {status: 'INCOMPLETE'},
    {status: 'INCOMPLETE'},
  ],

  gameComplete: false
};

const boards = {
  5: {
    playerCount: 5,
    numGood: 3,
    numBad: 2,
    doubleFailRequired: false,
    missionSizes: [2, 3, 2, 3, 3],
    mission1Size: 2,
    mission2Size: 3,
    mission3Size: 2,
    mission4Size: 3,
    mission5Size: 3
  },
  6: {
    playerCount: 6,
    numGood: 4,
    numBad: 2,
    doubleFailRequired: false,
    missionSizes: [2, 3, 4, 3, 4],
    mission1Size: 2,
    mission2Size: 3,
    mission3Size: 4,
    mission4Size: 3,
    mission5Size: 4
  },
  7: {
    playerCount: 7,
    numGood: 4,
    numBad: 3,
    doubleFailRequired: true,
    missionSizes: [2, 3, 3, 4, 4],
    mission1Size: 2,
    mission2Size: 3,
    mission3Size: 3,
    mission4Size: 4,
    mission5Size: 4
  },
  8: {
    playerCount: 8,
    numGood: 5,
    numBad: 3,
    doubleFailRequired: true,
    missionSizes: [3, 4, 4, 5, 5],
    mission1Size: 3,
    mission2Size: 4,
    mission3Size: 4,
    mission4Size: 5,
    mission5Size: 5
  },
  9: {
    playerCount: 9,
    numGood: 6,
    numBad: 3,
    doubleFailRequired: true,
    missionSizes: [3, 4, 4, 5, 5],
    mission1Size: 3,
    mission2Size: 4,
    mission3Size: 4,
    mission4Size: 5,
    mission5Size: 5
  },
  10: {
    playerCount: 10,
    numGood: 6,
    numBad: 4,
    doubleFailRequired: true,
    missionSizes: [3, 4, 4, 5, 5],
    mission1Size: 3,
    mission2Size: 4,
    mission3Size: 4,
    mission4Size: 5,
    mission5Size: 5
  }
};

const characters = {
  // todo: add lancelot info
  // todo: knowledge obj might be better - knowledge: { merlin: role: 'merlin', relationship: 'ally',  }
  merlin: {
    role: 'Merlin',
    alliance: 'GOOD',
    enemies: ['genericEvil', 'morgana', 'assassin', 'mordred', 'oberon', 'evilLancelot'],
    allies: ['percival', 'genericGood', 'goodLancelot'],
    sees: ['genericEvil', 'morgana', 'assassin', 'oberon', 'evilLancelot'],
    hidden: ['mordred']

  },
  percival: {
    role: 'Percival',
    alliance: 'GOOD',
    enemies: ['genericEvil', 'morgana', 'assassin', 'mordred', 'oberon', 'evilLancelot'],
    allies: ['merlin', 'genericGood', 'goodLancelot'],
    sees: ['merlin', 'morgana'],
    hidden: []

  },
  genericGood: {
    role: 'Loyal Servant of King Arthur',
    alliance: 'GOOD',
    enemies: ['genericEvil', 'morgana', 'assassin', 'mordred', 'oberon', 'evilLancelot'],
    allies: ['merlin', 'percival', 'goodLancelot']
  },
  goodLancelot: {
    role: 'Lancelot',
    alliance: 'EVIL',
    enemies: ['merlin', 'percival', 'genericGood', 'goodLancelot'],
    allies: ['merlin', 'percival', 'genericGood']
  },
  assassin: {
    role: 'Assassin',
    alliance: 'EVIL',
    enemies: ['merlin', 'percival', 'genericGood', 'goodLancelot'],
    allies: ['genericEvil', 'morgana', 'mordred', 'oberon', 'evilLancelot']
  },
  morgana: {
    role: 'Morgana',
    alliance: 'EVIL',
    enemies: ['merlin', 'percival', 'genericGood', 'goodLancelot'],
    allies: ['genericEvil', 'assassin', 'mordred', 'oberon', 'evilLancelot']
  },
  mordred: {
    role: 'Mordred',
    alliance: 'EVIL',
    enemies: ['merlin', 'percival', 'genericGood', 'goodLancelot'],
    allies: ['genericEvil', 'morgana', 'assassin', 'oberon', 'evilLancelot']
  },
  oberon: {
    role: 'Oberon',
    alliance: 'EVIL',
    enemies: ['merlin', 'percival', 'genericGood', 'goodLancelot'],
    allies: ['genericEvil', 'morgana', 'assassin', 'mordred', 'evilLancelot']
  },
  genericEvil: {
    role: 'Minion of Mordred',
    alliance: 'EVIL',
    enemies: ['merlin', 'percival', 'genericGood', 'goodLancelot'],
    allies: [, 'morgana', 'assassin', 'mordred', 'oberon', 'evilLancelot']
  },
  evilLancelot: {
    role: 'Lancelot',
    alliance: 'EVIL',
    enemies: ['merlin', 'percival', 'genericGood', 'goodLancelot'],
    allies: ['genericEvil', 'morgana', 'assassin', 'mordred', 'oberon']
  }
};

const fruits = {
  'apple': false,
  'apricot': false,
  'avocado': false,
  'banana': false,
  'blackberry': false,
  'blueberry': false,
  'cantaloupe': false,
  'cherry': false,
  'clementine': false,
  'coconut': false,
  'cranberry': false,
  'cucumber': false,
  'currant': false,
  'date': false,
  'dragonfruit': false,
  'durian': false,
  'eggplant': false,
  'elderberry': false,
  'fig': false,
  'grape': false,
  'grapefruit': false,
  'guava': false,
  'honeydew': false,
  'jackfruit': false,
  'jujube': false,
  'kiwi': false,
  'kumquat': false,
  'lemon': false,
  'lime': false,
  'lychee': false,
  'mango': false,
  'nectarine': false,
  'nut': false,
  'olive': false,
  'orange': false,
  'pamelo': false,
  'papaya': false,
  'passionfruit': false,
  'peach': false,
  'pear': false,
  'pineapple': false,
  'plum': false,
  'pomelo': false,
  'raisin': false,
  'raspberry': false,
  'strawberry': false,
  'tangerine': false,
  'tomato': false,
  'watermelon': false,
  'yuzu': false
};

const checkFruitsFull = () => {
  let keys = Object.keys(fruits);
  for (let i = 0; i < keys.length; i++) {
    if (!fruits[keys[i]]) { return false; }
  }
  return true;
}

const getRandomFruit = () => {
  if (checkFruitsFull()) { return null; }

  let randomizer = true;
  let keys = Object.keys(fruits);
  let randomFruit = keys[Math.floor(Math.random() * keys.length)];

  while(randomizer) {
    if (fruits[randomFruit] === true) {
      randomFruit = keys[Math.floor(Math.random() * keys.length)];
    } else {
      randomizer = false;
    }
  }
  fruits[randomFruit] = true;

  return randomFruit;
}

module.exports = { defaultRoomObject, boards, characters, getRandomFruit };
