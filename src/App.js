import React from 'react';
import io from 'socket.io-client';

import './App.css';

import Home from './containers/Home';
import JoinRoom from './containers/JoinRoom';
import CreateRoom from './containers/CreateRoom';

import ApiHelpers from './helpers/api';

let socket;

class App extends React.Component {
  constructor(props) {
    super(props);

  }

  componentDidMount() {
    socket = io('http://localhost:5000');

    socket.on('USER_EXISTS', data => console.log(data, '\nUSER_EXISTS\n', JSON.stringify(data, null, 2)));
    socket.on('USER_CREATED', data => {this.setState({status: 'USER_CREATED'}); console.log(data, '\nUSER_CREATED\n', JSON.stringify(data, null, 2))});
    socket.on('ROOMS_FULL', data => console.log(data, '\nROOMS_FULL\n', JSON.stringify(data, null, 2)));
    socket.on('ROOM_CREATED', data => console.log(data, '\nROOM_CREATED\n', JSON.stringify(data, null, 2)));
    socket.on('GAME_START', data => console.log(data, '\nGAME_START\n', JSON.stringify(data, null, 2)));
    socket.on('JOIN_ROOM_SUCCESS', data => console.log(data, '\nJOIN_ROOM_SUCCESS\n', JSON.stringify(data, null, 2)));
    socket.on('ROOM_FULL', data => console.log(data, '\nROOM_FULL\n', JSON.stringify(data, null, 2)));
    socket.on('TEAM_PROPOSED', data => console.log(data, '\nTEAM_PROPOSED\n', JSON.stringify(data, null, 2)));
    socket.on('PROPOSED_TEAM_VOTE_REGISTERED', data => console.log(data, '\nPROPOSED_TEAM_VOTE_REGISTERED\n', JSON.stringify(data, null, 2)));
    socket.on('PROPOSED_TEAM_VOTE_COUNTDOWN', data => console.log(data, '\nPROPOSED_TEAM_VOTE_COUNTDOWN\n', JSON.stringify(data, null, 2)));
    socket.on('NOT_ENOUGH_VOTES', data => console.log(data, '\nNOT_ENOUGH_VOTES\n', JSON.stringify(data, null, 2)));
    socket.on('START_MISSION_VOTING', data => console.log(data, '\nSTART_MISSION_VOTING\n', JSON.stringify(data, null, 2)));
    socket.on('START_PROPOSING_TEAM', data => console.log(data, '\nSTART_PROPOSING_TEAM\n', JSON.stringify(data, null, 2)));

    socket.on('roomState', data => console.log(data, '\n\n', JSON.stringify(data, null, 2)));
    socket.on('roomList', data => console.log(data, '\n\n', JSON.stringify(data, null, 2)));
    socket.on('fullState', data => console.log(data, '\n\n', JSON.stringify(data, null, 2)));
    socket.on('CLEAR_STATE', data => console.log(data, '\n\n', JSON.stringify(data, null, 2)));
  }

  // TODO persist state through refresh or fetch from server on load
  state = {
    status: '',
    userName: '',
    creatingRoom: false
  }

  handleNameChange = name => event => {
    this.setState({userName: event.target.value });
  };

  setCreatingRoom = (isCreatingRoom) => {
    this.setState({creatingRoom: isCreatingRoom});
  }

  render() {
    window.emit = (action, data) => socket.emit(action, data);
    window.test = () => ApiHelpers.createRoom({ numPeople: 5, isLancelot: false, board: 5, roomOwner: 'wilson' });

    switch (this.state.status) {
      case 'USER_CREATED':
        return this.state.creatingRoom
          ? (<CreateRoom userName={this.state.userName} />)
          : (<JoinRoom userName={this.state.userName}/>);
      case '':
      default:
        return (<Home userName={this.state.userName} handleNameChange={this.handleNameChange} setCreatingRoom={this.setCreatingRoom}/>);
    }
  }
}

export default App;
