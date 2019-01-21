import { Game, Scene, AUTO } from 'phaser'
import { Client } from 'colyseus.js'

const client = new Client('ws://127.0.0.1:3030')

class MainScene extends Scene {
  constructor() {
    super({key: 'mainScene'})
    this.avatars = {}
  }

  preload() {
    this.load.image('avatar', './static/avatar.png')
  }

  create() {
    const room = client.join('game')
    console.log(room)

    // use room to handle state and changes
    // room.onJoin.add((client) => {
    //   console.log("client joined successfully");
    //   console.log(client) // Is null
    // })
    //
    // room.onLeave.add(function() {
    //   console.log("client left the room");
    // });

    room.listen("players/:id", ({ path: { id }, operation, value }) => {
      if (operation === "add") {
        console.log("add new player")
        this.avatars[id] = this.add.image(value.x, value.y, "avatar");
      }
      if (operation === "remove") {
          console.log("client left the room");
        this.avatars[id].destroy();
      }
    });

    room.listen("players/:id/:attribute", ({ path: { id, attribute }, value, operation }) => {
      if (operation === "replace") {
        this.avatars[id][attribute] = value;
      }
    });

    this.input.on("pointermove", ({ x, y }) => {
      room.send({ action: "mousemove", x, y });
    });
  }
}

const game = new Game({
  scene: [MainScene],
  type: AUTO,
  width: window.innerWidth,
  height: window.innerHeight,
  pixelArt: true
})

const resizeGameToFullScreen = () => {
  game.resize(window.innerWidth, window.innerHeight)
}

window.addEventListener('resize', resizeGameToFullScreen)
window.addEventListener('load', resizeGameToFullScreen)