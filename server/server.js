const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const port = 5000;
const app = express();
const server = app.listen(port);
const io = require('socket.io').listen(server);

const { createUser, createRoom, joinRoom } = require('./userUtils');
const { submitTeamProposal, proposedTeamVoting, finalizeProposedTeamVoting, submitProposedTeamVote, handlePostProposedTeamVote } = require('./gameUtils');

let serverState = {
  rooms: {
    banana: {
      "roomName": "banana",
      "roomOwner": "wilson",
      "status": "WAITING_FOR_PLAYERS",
      "missionNum": 0,
      "createdAt": 1567419413701,
      "timer": null,
      "playerCount": 5,
      "selectedBoard": 5,
      "players": [
        "wilson",
        "red",
        "black",
        "blue"
      ],
      "boardInfo": {
        "playerCount": 5,
        "numGood": 3,
        "numBad": 2,
        "doubleFailRequired": false,
        "missionSizes": [
          2,
          3,
          2,
          3,
          3
        ],
        "mission1Size": 2,
        "mission2Size": 3,
        "mission3Size": 2,
        "mission4Size": 3,
        "mission5Size": 3
      },
      "kingOrder": [],
      "rejectedMissionCount": 0,
      "nextHammer": "",
      "proposedTeam": [],
      "proposedTeamVote": {},
      "questVote": {},
      "missionsData": [
        {
          "status": "incomplete"
        },
        {
          "status": "incomplete"
        },
        {
          "status": "incomplete"
        },
        {
          "status": "incomplete"
        },
        {
          "status": "incomplete"
        }
      ],
      "gameComplete": false
    }
  },
  players: {
    // wilson: {user: 'wilson'},
    // white: {user: 'white'},
    // blue: {user: 'blue'},
    // black: {user: 'black'},
    // red: {user: 'red'}
  }
}

app
  .use(cors())
  .use(bodyParser.urlencoded({ extended: false }))
  .use(bodyParser.json())
  // .use(express.static(path.join(__dirname, '../dist')));

app.get('/api/healthcheck', (req, res) => {
  res.sendStatus(200);
});

io.on('connection', socket => {
  console.log('a user connected');
  socket.on('disconnect', testdata => {
    console.log('user disconnected')
  });

  socket.on('CREATE_USER', user => {
    const { status, state } = createUser(serverState, user);
    socket.broadcast.emit(status, state.players);
    console.log(status, JSON.stringify(serverState, null, 2));
    // USER_EXISTS, USER_CREATED
  });

  socket.on('CREATE_ROOM', roomSettings => {
    const { status, roomName, state } = createRoom(serverState, roomSettings);
    socket.broadcast.emit(status, state[roomName]);
    console.log(status, JSON.stringify(serverState, null, 2));
    // ROOMS_FULL, ROOMS_CREATED
  });

  socket.on('JOIN_ROOM', data => {
    const { user, room } = data;
    const { status, state } = joinRoom(serverState, user, room);
    socket.broadcast.emit(status, state[room]);
    console.log(status, JSON.stringify(serverState, null, 2));
    // if room count === numPlayers => start game for room
    // GAME_START, JOIN_ROOM_SUCCESS, ROOM_FULL
  });

  socket.on('SUBMIT_TEAM_PROPOSAL', data => {
    const { room, nominationArr } = data;
    const { status, state } = submitTeamProposal(serverState, { room, nominationArr });
    console.log(status, JSON.stringify(serverState, null, 2));
    // TEAM_PROPOSED
  });

  socket.on('VOTE_FOR_PROPOSED_TEAM', data => {
    const { room, player, vote } = data;
    const { status, state } = proposedTeamVoting(serverState, { room, player, vote });
    console.log(status, JSON.stringify(serverState, null, 2));
    // PROPOSED_TEAM_VOTE_REGISTERED
  });

  socket.on('FINALIZE_PROPOSED_TEAM_VOTING', data => {
    const { room } = data;
    const { status, state } = finalizeProposedTeamVoting(serverState, { room });
    console.log(status, JSON.stringify(serverState, null, 2));
    // PROPOSED_TEAM_VOTE_COUNTDOWN, NOT_ENOUGH_VOTES
  });

  socket.on('SUBMIT_PROPOSED_TEAM_VOTE', data => {
    const { room } = data;
    const { status, state } = submitProposedTeamVote(serverState, { room });
    console.log(status, JSON.stringify(serverState, null, 2));
  });

  socket.on('roomState', data => {
    console.log(JSON.stringify(serverState.rooms[data.room], null, 2));
  });

  socket.on('fullState', () => {
    console.log(JSON.stringify(serverState, null, 2));
  });

  socket.on('CLEAR_STATE', () => {
    serverState = {  rooms: {}, players: {} };
    console.log(status, JSON.stringify(serverState, null, 2));
  });

});

  console.log(`app running on port ${port}`);