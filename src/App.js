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

class App extends React.Component {

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


  render() {

    return (
      <Provider>
        <Context.Consumer>
        {context => (
          <div>
            <NavBar />
            {context.shouldShowGameBoard ? (<GameBoard />) : this.renderPage(context)}
          </div>
        )}
        </Context.Consumer>
      </Provider>
    );
  }
}

export default App;
