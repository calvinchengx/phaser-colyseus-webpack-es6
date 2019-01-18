import { Game, Scene, AUTO } from 'phaser'
import { Client } from 'colyseus.js'

const client = new Client('ws://127.0.0.1:3030')

class MainScene extends Scene {
  constructor() {
    super('mainScene')
  }

  preload() {
    // preload assets
  }

  create() {
    const room = client.join('game')
    console.log(room)

    // use room to handle state and changes
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