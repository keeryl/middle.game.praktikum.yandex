import { View } from './View'
import { Enemy } from './Enemy'
import { Player } from './Player'
import { getInitialPositions } from './config'

export class World {
  view: View
  player: Player
  enemies: Enemy[]

  constructor(canvas: HTMLCanvasElement, context: CanvasRenderingContext2D) {
    this.loop = this.loop.bind(this)
    this.view = new View(canvas, context)
    this.view.init()
    this.player = {} as Player
    this.enemies = []
    this.spawnPlayer(canvas, context)
    this.spawnEnemies(canvas, context)
    this.setEventListeners()
  }

  public setEventListeners() {
    document.addEventListener('keydown', e => {
      if (e.code === 'ArrowUp') {
        this.player.moveUp()
        this.rerender()
      }
      if (e.code === 'ArrowDown') {
        this.player.moveDown()
        this.rerender()
      }
      if (e.code === 'ArrowLeft') {
        this.player.moveLeft()
        this.rerender()
      }
      if (e.code === 'ArrowRight') {
        this.player.moveRight()
        this.rerender()
      }
    })
  }

  private spawnPlayer(
    canvas: HTMLCanvasElement,
    context: CanvasRenderingContext2D
  ) {
    this.player = new Player(
      canvas,
      context,
      getInitialPositions(canvas).PLAYER
    )
    this.player.render()
  }

  private spawnEnemies(
    canvas: HTMLCanvasElement,
    context: CanvasRenderingContext2D
  ) {
    getInitialPositions(canvas).ENEMIES.forEach(position => {
      this.enemies.push(new Enemy(canvas, context, position))
    })

    this.enemies.forEach(enemy => enemy.render())
  }

  private rerender() {
    this.view.update()
    this.player.render()
    this.enemies.forEach(enemy => enemy.render())
  }

  public init() {
    requestAnimationFrame(this.loop)
  }

  private loop() {
    requestAnimationFrame(this.loop)
  }
}
