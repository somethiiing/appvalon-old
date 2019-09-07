import React from 'react';
import io from 'socket.io-client';

import './App.css';

let socket;

class App extends React.Component {
  constructor(props) {
    super(props);

  }

  componentDidMount() {
    socket = io('http://localhost:5000');
    socket.on('USER_EXISTS', data => console.log(data));
    socket.on('USER_CREATED', data => console.log(data));
    socket.on('ROOMS_FULL', data => console.log(data));
    socket.on('ROOM_CREATED', data => console.log(data));
    socket.on('GAME_START', data => console.log(data));
    socket.on('JOIN_ROOM_SUCCESS', data => console.log(data));
    socket.on('ROOM_FULL', data => console.log(data));
    socket.on('TEAM_PROPOSED', data => console.log(data));
    socket.on('PROPOSED_TEAM_VOTE_REGISTERED', data => console.log(data));
    socket.on('PROPOSED_TEAM_VOTE_COUNTDOWN', data => console.log(data));
    socket.on('NOT_ENOUGH_VOTES', data => console.log(data));
    socket.on('START_MISSION_VOTING', data => console.log(data));
    socket.on('START_PROPOSING_TEAM', data => console.log(data));

  }

  render() {
    window.emit = (action, data) => socket.emit(action, data);

    return (
      <div>home div</div>
    );
  }
}

export default App;
