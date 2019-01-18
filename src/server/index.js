import { Server } from 'colyseus'
import http from 'http'
import GameRoom from './game-room';

const gameServer = new Server({
  server: http.createServer()
})

gameServer.register("game", GameRoom)

gameServer.listen(3030)