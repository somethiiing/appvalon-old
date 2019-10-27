import React from 'react';
import io from 'socket.io-client';

import './App.css';

import Home from './containers/Home';

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
      <Home />
    );
  }
}

export default App;
