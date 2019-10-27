const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const port = 5000;
const app = express();
const server = app.listen(port);
const io = require('socket.io').listen(server);

const proposedTeamDisplayResultTime = 15000;

const { createUser, createRoom, joinRoom } = require('./userUtils');
const { submitTeamProposal, proposedTeamVoting, finalizeProposedTeamVoting, submitProposedTeamVote, handlePostProposedTeamVote } = require('./gameUtils');

let serverState = {
  rooms: {
    banana: {
      "roomName": "banana",
      "roomOwner": "wilson",
      "status": "PROPOSED_TEAM_VOTING",
      "missionNum": 1,
      "createdAt": 1567419413701,
      "timer": null,
      "playerCount": 5,
      "selectedBoard": 5,
      "players": [
        "wilson",
        "red",
        "black",
        "blue",
        "white"
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
      "kingOrder": [
        "wilson",
        "white",
        "red",
        "black",
        "blue"
      ],
      "rejectedMissionCount": 0,
      "nextHammer": "",
      "proposedTeam": [
        "white",
        "blue"
      ],
      "proposedTeamVote": {
        "white": "REJECT",
        "blue": "REJECT",
        "black": "REJECT",
        "red": "REJECT",
        "wilson": "REJECT"
      },
      "proposedTeamVoteResults": "",
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
    wilson: {user: 'wilson'},
    white: {user: 'white'},
    blue: {user: 'blue'},
    black: {user: 'black'},
    red: {user: 'red'}
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
    // user: 'name'
    const { status, state } = createUser(serverState, user);
    io.emit(status, state.players);
    console.log(status, JSON.stringify(serverState, null, 2));
    // USER_EXISTS, USER_CREATED
  });

  socket.on('CREATE_ROOM', roomSettings => {
    // settings: { numPeople: number, isLancelot: boolean, board: number, roomOwner: string }
    const { status, room, state } = createRoom(serverState, roomSettings);
    io.emit(status, state.rooms[room]);
    console.log(status, JSON.stringify(serverState, null, 2));
    // ROOMS_FULL, ROOM_CREATED
  });

  socket.on('JOIN_ROOM', data => {
    // data: { room: 'roomname', user: 'username' }
    const { user, room } = data;
    const { status, state } = joinRoom(serverState, user, room);
    io.emit(status, state.rooms[room]);
    console.log(status, JSON.stringify(serverState, null, 2));
    // if room count === numPlayers => start game for room
    // GAME_START, JOIN_ROOM_SUCCESS, ROOM_FULL
  });

  socket.on('SUBMIT_TEAM_PROPOSAL', data => {
    // data: { room: 'roomname', nominationArr: [name1, name2, name3] }
    const { room, nominationArr } = data;
    const { status, state } = submitTeamProposal(serverState, { room, nominationArr });
    io.emit(status, state.rooms[room]);
    console.log(status, JSON.stringify(serverState, null, 2));
    // TEAM_PROPOSED
  });

  socket.on('VOTE_FOR_PROPOSED_TEAM', data => {
    // data: { room: 'roomname', player: 'playername', vote: 'REJECT' or 'APPROVE' }
    const { room, player, vote } = data;
    const { status, state } = proposedTeamVoting(serverState, { room, player, vote });
    io.emit(status, state.rooms[room]);
    console.log(status, JSON.stringify(serverState, null, 2));
    // PROPOSED_TEAM_VOTE_REGISTERED
  });

  socket.on('FINALIZE_PROPOSED_TEAM_VOTING', data => {
    // data: { room: 'roomname' }
    const { room } = data;
    const { status, state } = finalizeProposedTeamVoting(serverState, { room });
    io.emit(status, state.rooms[room]);
    console.log(status, JSON.stringify(serverState, null, 2));
    // PROPOSED_TEAM_VOTE_COUNTDOWN, NOT_ENOUGH_VOTES
  });

  socket.on('SUBMIT_PROPOSED_TEAM_VOTE', data => {
    // data: { room: 'roomname' }
    const { room } = data;
    const { status, state } = submitProposedTeamVote(serverState, { room });
    io.emit(status, state.rooms[room]);
    setTimeout( () => {
      const postProposedTeamVoteData = handlePostProposedTeamVote(state, room, serverState.rooms[room].proposedTeamVoteResults);
      io.emit(postProposedTeamVoteData.status, state.rooms[room]);
    }, proposedTeamDisplayResultTime)
    console.log(status, JSON.stringify(serverState, null, 2));
    // START_MISSION_VOTING, START_PROPOSING_TEAM
  });

  socket.on('roomState', data => {
    const { room } = data;
    io.emit('roomState', serverState.rooms[room]);
    console.log(JSON.stringify(serverState.rooms[data.room], null, 2));
  });

  socket.on('fullState', () => {
    io.emit('fullState', serverState);
    console.log(JSON.stringify(serverState, null, 2));
  });

  socket.on('CLEAR_STATE', () => {
    serverState = {  rooms: {}, players: {} };
    io.emit('CLEAR_STATE', serverState)
    console.log(status, JSON.stringify(serverState, null, 2));
  });

});

  console.log(`app running on port ${port}`);