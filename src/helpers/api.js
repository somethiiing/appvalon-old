import socketIOClient from "socket.io-client";
const socket = socketIOClient('http://localhost:5000');

// CREATE_USER
export const createUser = (name) => {
  socket.emit('CREATE_USER', name)
}

export default {
  createUser
}
