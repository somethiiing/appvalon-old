import React from 'react';
import io from 'socket.io-client';

import Game from './containers/Game';

import './stylesheets/normalize.css';
import './App.css';

let socket;

class App extends React.Component {
  constructor(props) {
    super(props);

  }

  componentDidMount() {
    socket = io('http://localhost:5000');

  }

  render() {
    window.emit = (action, data) => socket.emit(action, data);

    return (
      <Game/>
    );
  }
}

export default App;
