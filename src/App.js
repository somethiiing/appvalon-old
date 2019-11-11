import React from 'react';

import './App.css';

import Provider from './Provider';
import Context from './Context';
import Home from './containers/Home';
import JoinRoom from './containers/JoinRoom';
import CreateRoom from './containers/CreateRoom';
import ProposeTeam from './containers/ProposeTeam';
import GameBoard from './containers/GameBoard';
import NavBar from './containers/NavBar';

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
    const {status, userName, roomData, isCreatingRoom} = context;
    //TODO how to handle user exists?
    switch (status) {
      case 'USER_CREATED':
        return isCreatingRoom
          ? (<CreateRoom />)
          : (<JoinRoom />);
      case 'GAME_START':
      case 'START_PROPOSING_TEAM':
        return userName === roomData.kingOrder[0]
          ? (<ProposeTeam playerList={roomData.kingOrder} teamSize={roomData.boardInfo.missionSizes[roomData.missionNum-1]}/>)
          : (<div>TODO view proposed team</div>);
      case '':
      default:
        return (<Home />);
    }
  };

  renderRealStuff = (context) => {
    return (
      <div>
        <NavBar />
        {context.shouldShowGameBoard ? (<GameBoard roomData={fakeRoomData}/>) : this.renderPage(context)}
      </div>
    );
  }

  renderTestStuff = (context) => {
    return (
      <div>
      {<button onClick={this.toggleShowApiUI}>{`ApiUI >><< Gameboard`}</button>}
      {this.state.showApiUI && <ApiUI />}
      {<GameBoard roomData={fakeRoomData} />}
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
