// import { Server } from 'colyseus'
// import http from 'http'
// import GameRoom from './game-room';
// import path from 'path'
const Server = require('colyseus').Server
const http = require('http')
const GameRoom = require('./game-room')
const path = require('path')
const express = require('express')

const app = express()

const gameServer = new Server({
  server: http.createServer(app)
})

gameServer.register("game", GameRoom)

gameServer.listen(3030)

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname + '/../../dist/public/index.html')) //TODO: Use static
})

app.get('/index.js', (req, res) => {
  res.sendFile(path.join(__dirname + '/../../dist/public/index.js'))
})

app.use('/static', express.static('src/client'))

app.listen(3000, () => {
  console.log('app listening on port 3000')
})