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
  // settings: { numPeople: Number, isLancelot: boolean, board: number, roomOwner: string }
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

  return { status: 'ROOM_CREATED', state };
};

const joinRoom = (state, user, room) => {
  state.rooms[room].players.push(user);
  return { status: 'JOIN_ROOM', state };
}



module.exports = { createUser, createRoom, joinRoom };
