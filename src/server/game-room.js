const Room = require('colyseus').Room

class GameRoom extends Room {
  // this room supports only 4 clients connected
  constructor() {
    super();
    this.maxClients = 4;
  }

  onInit(options) {
    this.clock.setTimeout(() => this.broadcast("Oh sheet!"), 100)
    this.setState({
      players: {}
    });
  }

  onJoin(client) {
    this.state.players[client.sessionId] = {
      x: 0,
      y: 0
    };
  }

  onLeave(client) {
    delete this.state.players[client.sessionId];
  }

  onMessage(client, data) {
    if (data.action === "mousemove") {
      this.state.players[client.sessionId].x = data.x;
      this.state.players[client.sessionId].y = data.y;
    }
  }

  onDispose() {
    console.log("Dispose BasicRoom");
  }
}

// export default GameRoom
module.exports = GameRoom