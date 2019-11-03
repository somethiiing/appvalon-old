import React from 'react';
import io from 'socket.io-client';

import './App.css';

import Home from './containers/Home';
import JoinRoom from './containers/JoinRoom';
import CreateRoom from './containers/CreateRoom';
import ProposeTeam from './containers/ProposeTeam';

import ApiHelpers from './helpers/api';

let socket;

class App extends React.Component {
  constructor(props) {
    super(props);

  }

  componentDidMount() {
    socket = io('http://localhost:5000');

    socket.on('USER_EXISTS', data => {this.setState({status: 'USER_EXISTS'}); this.logStatusData('USER_EXISTS', data)});
    socket.on('USER_CREATED', data => {this.setState({status: 'USER_CREATED'}); this.logStatusData('USER_CREATED', data)});
    socket.on('ROOMS_FULL', data => {this.setState({status: 'ROOMS_FULL'}); this.logStatusData('ROOMS_FULL', data)});
    socket.on('ROOM_CREATED', data => {this.setState({status: 'ROOM_CREATED', roomData: data}); this.logStatusData('ROOM_CREATED', data)});
    socket.on('GAME_START', data => {this.setState({status: 'GAME_START', roomData: data});this.logStatusData('GAME_START', data)});
    socket.on('JOIN_ROOM_SUCCESS', data => {this.setState({status: 'JOIN_ROOM_SUCCESS', roomData: data}); this.logStatusData('JOIN_ROOM_SUCCESS', data)});
    socket.on('ROOM_FULL', data => {this.setState({status: 'ROOM_FULL'}); this.logStatusData('ROOM_FULL', data)});
    socket.on('TEAM_PROPOSED', data => {this.setState({status: 'TEAM_PROPOSED'}); this.logStatusData('TEAM_PROPOSED', data)});
    socket.on('PROPOSED_TEAM_VOTE_REGISTERED', data => {this.setState({status: 'PROPOSED_TEAM_VOTE_REGISTERED'}); this.logStatusData('PROPOSED_TEAM_VOTE_REGISTERED', data)});
    socket.on('PROPOSED_TEAM_VOTE_COUNTDOWN', data => {this.setState({status: 'PROPOSED_TEAM_VOTE_COUNTDOWN'}); this.logStatusData('PROPOSED_TEAM_VOTE_COUNTDOWN', data)});
    socket.on('NOT_ENOUGH_VOTES', data => {this.setState({status: 'NOT_ENOUGH_VOTES'}); this.logStatusData('NOT_ENOUGH_VOTES', data)});
    socket.on('START_MISSION_VOTING', data => {this.setState({status: 'START_MISSION_VOTING'}); this.logStatusData('START_MISSION_VOTING', data)});
    socket.on('START_PROPOSING_TEAM', data => {this.setState({status: 'START_PROPOSING_TEAM'}); this.logStatusData('START_PROPOSING_TEAM', data)});

    socket.on('roomState', data => this.logStatusData('', data));
    socket.on('roomList', data => this.logStatusData('', data));
    socket.on('fullState', data => this.logStatusData('', data));
    socket.on('CLEAR_STATE', data => this.logStatusData('', data));
  }

  // TODO persist state through refresh or fetch from server on load
  state = {
    status: '',
    userName: '',
    roomData: '',
    isCreatingRoom: false,
    serverState: {}
  }

  logStatusData = (status, data) => {
    console.log(data, `\n${status}\n`, JSON.stringify(data, null, 2));
  }

  handleNameChange = name => event => {
    this.setState({userName: event.target.value });
  };

  setIsCreatingRoom = (isCreatingRoom) => {
    this.setState({isCreatingRoom: isCreatingRoom});
  }

  render() {
    const {status, userName, roomData, isCreatingRoom, serverState} = this.state;

    window.emit = (action, data) => socket.emit(action, data);
    window.test = (name) => ApiHelpers.joinRoom(name, roomData.roomName);

    switch (status) {
      case 'USER_CREATED':
        return isCreatingRoom
          ? (<CreateRoom userName={userName} />)
          : (<JoinRoom userName={userName}/>);
      case 'GAME_START':
      case 'START_PROPOSING_TEAM':
        return userName === roomData.kingOrder[0]
          ? (<ProposeTeam roomName={roomData.roomName} playerList={roomData.kingOrder} teamSize={roomData.boardInfo[`mission${roomData.missionNum}Size`]}/>)
          : (<div>view proposed team</div>);
      case '':
      default:
        return (<Home userName={userName} handleNameChange={this.handleNameChange} setIsCreatingRoom={this.setIsCreatingRoom}/>);
    }
  }
}

export default App;
