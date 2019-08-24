const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const port = 5000;
const app = express();
const server = app.listen(port);
const io = require('socket.io').listen(server);

let serverState = {
  rooms: {},
  players: {}
}

app
  .use(cors())
  .use(bodyParser.urlencoded({ extended: false }))
  .use(bodyParser.json())
  // .use(express.static(path.join(__dirname, '../dist')));

  app.get('/api/healthcheck', (req, res) => {
    res.sendStatus(200);
  });

io.on('connection', socket => {
  console.log(socket, 'a user connected');
  socket.on('disconnect', testdata => {
    console.log(socket, testdata, 'user disconnected')
  });

  socket.on('fruitcup', data => {console.log('i love fruit', data)})

});

  console.log(`app running on port ${port}`);