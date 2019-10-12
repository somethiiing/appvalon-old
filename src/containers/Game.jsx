import React from 'react';
import GameTracker from '../components/GameTracker'

class Game extends React.Component {
  constructor(props) {
    super(props);

  }

  render() {
    return (
      <GameTracker numGood={5} numEvil={4} missionNum={1}/>
    );
  }
}

export default Game;
