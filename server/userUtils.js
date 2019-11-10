const { gameInstantiation } = require('./gameUtils');
const { defaultRoomObject, getRandomFruit, boards } = require('./gameConstants');

const fakeRoomSettings = {
  roomOwner: 'wilson',
  isLancelot: false,
  numPeople: 8
}

let emptyState = {
  rooms: {},
  players: {}
};

const createUser = (state, user) => {
  if (state.players[user]) {
    return { status: 'USER_EXISTS', state };
  } else {
    state.players[user] = { name: user };
    return { status: 'USER_CREATED', state };
  }
};

const createRoom = (state, settings) => {
  // settings: { numPeople: number, isLancelot: boolean, board: number, roomOwner: string }
  const roomName = getRandomFruit();
  if (roomName === null) { return { status: 'ROOMS_FULL', state } };

  const { numPeople, isLancelot, board, roomOwner } = settings;
  const boardIndex = isLancelot ? board: numPeople;

  const room = {
    ...defaultRoomObject,
    roomName,
    boardInfo: boards[boardIndex],
    playerCount: numPeople,
    selectedBoard: boardIndex,
    roomOwner,
    players: [roomOwner]
  }

  state.rooms[roomName] = room;

  return { status: 'ROOM_CREATED', room: roomName, state };
};

const joinRoom = (state, user, room) => {
  // todo: stop adding of extra users
  // return ROOM_FULL
  let roomData = state.rooms[room];

  if (!roomData) {
    return { status: 'JOIN_ROOM_ROOM_NOT_FOUND', state };
  }

  roomData.players.push(user);
  state.rooms[room] = roomData;
  if (roomData.playerCount === roomData.players.length) {
    let instantiatedGame = gameInstantiation(state, room);
    state.rooms[room] = instantiatedGame.roomData;
    return { status: 'GAME_START', state };
  }
  return { status: 'JOIN_ROOM_SUCCESS', state };
}



module.exports = { createUser, createRoom, joinRoom };
