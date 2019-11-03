import socketIOClient from "socket.io-client";
const socket = socketIOClient('http://localhost:5000');

export const createUser = (name) => {
  socket.emit('CREATE_USER', name);
}

export const createRoom = (settings) => {
  socket.emit('CREATE_ROOM', settings);
}

export const joinRoom = (user, room) => {
  socket.emit('JOIN_ROOM', { user, room });
}

export const submitTeamProposal = (roomName, proposedTeam) => {
  socket.emit('SUBMIT_TEAM_PROPOSAL', {room: roomName, nominationArr: proposedTeam})
}

export const getRoomList = () => {
  socket.emit('roomList');
}

// Get full server state
export const getFullState = () => {
  socket.emit('fullState');
}

export default {
  createUser,
  createRoom,
  joinRoom,
  submitTeamProposal,
  getRoomList,
  getFullState
}
