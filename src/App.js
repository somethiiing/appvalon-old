import React from 'react';

import './App.css';

import Provider from './Provider';
import Context from './Context';
import * as Containers from './containers';

import ApiUI from './ApiUI';
import fakeRoomData from './fakeRoomData';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showApiUI: false
    };

    this.toggleShowApiUI = this.toggleShowApiUI.bind(this);
  }

  toggleShowApiUI() {
    this.setState({showApiUI: !this.state.showApiUI})
  }

  renderPage = (context) => {
    const {status, roomData, isCreatingRoom} = context;
    //TODO how to handle user exists?
    switch (status) {
      case 'USER_CREATED':
        return isCreatingRoom
          ? (<Containers.CreateRoom />)
          : (<Containers.JoinRoom />);
      case 'ROOM_CREATED':
      case 'JOIN_ROOM_SUCCESS':
        return (<Containers.WaitForGameStart />);
      case 'GAME_START':
      case 'START_PROPOSING_TEAM':
        return context.isKing
          ? (<Containers.ProposeTeam playerList={roomData.kingOrder} teamSize={roomData.boardInfo.missionSizes[roomData.missionNum-1]}/>)
          : (<Containers.ViewProposedTeam />);
      case 'TEAM_PROPOSED':
      case 'PROPOSED_TEAM_VOTE_REGISTERED':
      case 'PROPOSED_TEAM_VOTE_COUNTDOWN':
      case 'NOT_ENOUGH_VOTES':
        return (<Containers.VoteOnTeam numVotesReady={Object.keys(context.roomData.proposedTeamVote).length}/>);
      case '':
      default:
        return (<Containers.Home />);
    }
  };

  renderRealStuff = (context) => {
    return (
      <div>
        <Containers.NavBar />
        {context.shouldShowGameBoard ? (<Containers.GameBoard roomData={fakeRoomData}/>) : this.renderPage(context)}
      </div>
    );
  }

  renderTestStuff = (context) => {
    return (
      <div style={{width: '100%', height: '100%'}}>
      {<button onClick={this.toggleShowApiUI}>{`ApiUI >><< Gameboard`}</button>}
      {this.state.showApiUI && <ApiUI />}
      {<Containers.GameBoard roomData={fakeRoomData} />}
      {/* {context.roomData && <GameBoard roomData={context.roomData} />} */}
      </div>
    );
  }

  render() {
    const apiTestMode = false;

    return (
      <Provider>
        <Context.Consumer>
        {context => (
          <div style={{width: '100%', height: '100%'}}>
            {apiTestMode ? this.renderTestStuff(context) : this.renderRealStuff(context)}
          </div>
        )}
        </Context.Consumer>
      </Provider>
    );
  }
}

export default App;
