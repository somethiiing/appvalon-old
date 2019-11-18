import React from 'react';
import io from 'socket.io-client';

import Context from './Context';

let socket;

class Provider extends React.Component {

  componentDidMount() {
    socket = io('http://localhost:5000');
    //TODO why is the room creator's username '' when finalizing team votes?
    socket.on('USER_EXISTS', data => {this.setState({status: 'USER_EXISTS'}); this.logStatusData('USER_EXISTS', data)});
    socket.on('USER_CREATED', data => {this.setState({status: 'USER_CREATED'}); this.logStatusData('USER_CREATED', data)});
    socket.on('ROOMS_FULL', data => {this.setState({status: 'ROOMS_FULL'}); this.logStatusData('ROOMS_FULL', data)});
    socket.on('ROOM_CREATED', data => {this.setState({status: 'ROOM_CREATED', roomData: data}); this.logStatusData('ROOM_CREATED', data)});
    socket.on('GAME_START', data => {this.setState({status: 'GAME_START', isInGame: true, roomData: data});this.logStatusData('GAME_START', data)});
    socket.on('JOIN_ROOM_SUCCESS', data => {this.setState({status: 'JOIN_ROOM_SUCCESS', roomData: data}); this.logStatusData('JOIN_ROOM_SUCCESS', data)});
    socket.on('ROOM_FULL', data => {this.setState({status: 'ROOM_FULL'}); this.logStatusData('ROOM_FULL', data)});
    socket.on('TEAM_PROPOSED', data => {this.setState({status: 'TEAM_PROPOSED', roomData: data}); this.logStatusData('TEAM_PROPOSED', data)});
    socket.on('PROPOSED_TEAM_VOTE_REGISTERED', data => {this.setState({status: 'PROPOSED_TEAM_VOTE_REGISTERED', roomData: data}); this.logStatusData('PROPOSED_TEAM_VOTE_REGISTERED', data)});
    socket.on('PROPOSED_TEAM_VOTE_COUNTDOWN', data => {this.setState({status: 'PROPOSED_TEAM_VOTE_COUNTDOWN', roomData: data}); this.logStatusData('PROPOSED_TEAM_VOTE_COUNTDOWN', data)});
    socket.on('NOT_ENOUGH_VOTES', data => {this.setState({status: 'NOT_ENOUGH_VOTES', roomData: data}); this.logStatusData('NOT_ENOUGH_VOTES', data)});
    socket.on('START_MISSION_VOTING', data => {this.setState({status: 'START_MISSION_VOTING', roomData: data}); this.logStatusData('START_MISSION_VOTING', data)});
    socket.on('START_PROPOSING_TEAM', data => {this.setState({status: 'START_PROPOSING_TEAM', roomData: data}); this.logStatusData('START_PROPOSING_TEAM', data)});

    socket.on('ROOM_NOT_FOUND', data => this.logStatusData('ROOM_NOT_FOUND', data))

    socket.on('GOT_ROOM_STATE', data => {
      this.setState({status: data.status, roomData: data})
      this.logStatusData('', data)
    });
    socket.on('GOT_ROOM_LIST', data => this.logStatusData('', data));
    socket.on('GOT_FULL_STATE', data => this.logStatusData('', data));
    socket.on('CLEAR_STATE', data => this.logStatusData('', data));
  };

  // TODO persist state through refresh or fetch from server on load
    state = {
      status: '',
      isInGame: false,
      shouldShowGameBoard: false,
      userName: '',
      isKing: false,
      roomData: {
        missionSizes: [],
        kingOrder: []
      },
      isCreatingRoom: false,
      serverState: {}
    };

    setGlobalState = (state) => {
      this.setState(state);
    }

    handleNameChange = name => event => {
      this.setState({userName: event.target.value });
    };

    toggleShouldShowGameBoard = () => {
      this.setState({shouldShowGameBoard: !this.state.shouldShowGameBoard});
    };

    logStatusData = (status, data) => {
      console.log(data, `\n${status}\n`, JSON.stringify(data, null, 2));
    };

    displayArray = (arr) => {
      return arr.toString().replace(/,/g, ', ');
    }

    createUser = (name) => {
      socket.emit('CREATE_USER', name);
    };

    createRoom = (settings) => {
      socket.emit('CREATE_ROOM', settings);
    };

    joinRoom = (user, room) => {
      socket.emit('JOIN_ROOM', { user, room });
    };

    submitTeamProposal = (roomName, proposedTeam) => {
      socket.emit('SUBMIT_TEAM_PROPOSAL', {room: roomName, nominationArr: proposedTeam});
    };

    voteOnProposedTeam = (roomName, userName, vote) => {
      socket.emit('VOTE_FOR_PROPOSED_TEAM', {room: roomName, player: userName, vote});
    };

    finalizeProposedTeamVoting = (roomName) => {
      socket.emit('FINALIZE_PROPOSED_TEAM_VOTING', {room: roomName});
    };

    rematch = () => {
      //TODO make a backend method for this
      alert('nope');
    }

    getRoomList = () => {
      socket.emit('ROOM_LIST');
    };

    getFullState = () => {
      socket.emit('FULL_STATE');
    };

    render() {
      window.emit = (action, data) => socket.emit(action, data);
      window.test = (name) => this.joinRoom(name, this.state.roomData.roomName);

      return (
          <Context.Provider
              value={{
                  status: this.state.status,
                  isInGame: this.state.isInGame,
                  shouldShowGameBoard: this.state.shouldShowGameBoard,
                  userName: this.state.userName,
                  isKing: this.state.userName === this.state.roomData.kingOrder[0],
                  roomData: this.state.roomData,
                  isCreatingRoom: this.state.isCreatingRoom,
                  serverState: this.state.serverState,
                  setGlobalState: this.setGlobalState,
                  handleNameChange: this.handleNameChange,
                  toggleShouldShowGameBoard: this.toggleShouldShowGameBoard,
                  displayArray: this.displayArray,
                  socket: socket,
                  createUser: this.createUser,
                  createRoom: this.createRoom,
                  joinRoom: this.joinRoom,
                  submitTeamProposal: this.submitTeamProposal,
                  voteOnProposedTeam: this.voteOnProposedTeam,
                  finalizeProposedTeamVoting: this.finalizeProposedTeamVoting,
                  rematch: this.rematch,
                  getRoomList: this.getRoomList,
                  getFullState: this.getFullState
              }}
          >
              {this.props.children}
          </Context.Provider>
      );
    }
}

export default Provider;
