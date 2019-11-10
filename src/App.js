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

let fakeRoomData = {
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
      "status": "success"
    },
    {
      "status": "fail"
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
};

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
            {context.shouldShowGameBoard ? (<GameBoard roomDate={fakeRoomData}/>) : this.renderPage(context)}
          </div>
        )}
        </Context.Consumer>
      </Provider>
    );
  }
}

export default App;
