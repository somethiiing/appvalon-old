import React from 'react';
import io from 'socket.io-client';

import './App.css';

let socket;

class App extends React.Component {
  constructor(props) {
    super(props);

  }

  componentDidMount() {
    socket = io('http://localhost:5000');
    socket.on('', data => console.log(data));
  }

  render() {
    window.emit = (action, data) => socket.emit(action, data);

    return (
      <div>home div</div>
    );
  }
}

export default App;
