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


  }

  render() {
    return (
      <div>home div</div>
    );
  }
}

export default App;
