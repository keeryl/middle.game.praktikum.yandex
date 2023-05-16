import { View } from './View'
import { Enemy } from './Enemy'
import { Player } from './Player'
import { Bullet } from './Bullet'
import { getInitialPositions } from './config'

export class World {
  canvas: HTMLCanvasElement
  context: CanvasRenderingContext2D
  view: View
  player: Player
  enemies: Enemy[]
  bullets: Bullet[]
  animation: {
    startTime: number,
    animationTime: number,
  }

  constructor(canvas: HTMLCanvasElement, context: CanvasRenderingContext2D) {
    this.canvas = canvas
    this.context = context
    this.loop = this.loop.bind(this)
    this.view = new View(canvas, context)
    this.view.init()
    this.player = {} as Player
    this.enemies = []
    this.bullets = []
    this.spawnPlayer(canvas, context)
    this.spawnEnemies(canvas, context)
    this.animation = {
      startTime: 0,
      animationTime: 5000,
    };
    this.setEventListeners()
  }

  public setEventListeners() {
    document.addEventListener('keydown', e => {
      if (e.code === 'ArrowUp') {
        this.player.moveUp()
        this.rerender()
        // this.animation.startTime = performance.now();
        // this.animate();
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
      if (e.code === 'Space') {
        this.spanBullet(this.canvas, this.context)        
      }
    })
  }

  public animate() {
    const time = performance.now();
    const shiftTime = time - this.animation.startTime;
    const multiply = shiftTime / this.animation.animationTime;

    this.player.moveUp()
    this.rerender()

    if (multiply < 1) {
      requestAnimationFrame(this.animate.bind(this));
    }
  };

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

  private spanBullet(
    canvas: HTMLCanvasElement,
    context: CanvasRenderingContext2D
  ) {
    this.bullets.push(new Bullet(canvas, context, this.player.position))

    this.bullets.forEach(bullet => bullet.render())
  }

  private rerender() {
    this.view.update()
    this.player.render()
    this.enemies.forEach(enemy => enemy.render())
    this.bullets.forEach(bullet => bullet.render())
  }

  public init() {
    requestAnimationFrame(this.loop)
  }

  private loop() {
    requestAnimationFrame(this.loop)
  }
}
