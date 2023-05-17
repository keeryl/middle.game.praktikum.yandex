import { View } from './View'
import { Enemy } from './Enemy'
import { Player } from './Player'
import { Bullet } from './Bullet'
import { getInitialPositions } from './config'
import { Tank } from './Tank'

export class World {
  canvas: HTMLCanvasElement
  context: CanvasRenderingContext2D
  view: View
  player: Player
  enemies: Enemy[]
  bullets: Bullet[]

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
      if (e.code === 'Space') {
        this.spanBullet(this.canvas, this.context)
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
      getInitialPositions().PLAYER
    )
    this.player.render()
  }

  private spawnEnemies(
    canvas: HTMLCanvasElement,
    context: CanvasRenderingContext2D
  ) {
    getInitialPositions().ENEMIES.forEach(position => {
      this.enemies.push(new Enemy(canvas, context, position))
    })

    this.enemies.forEach(enemy => enemy.render())
  }

  private spanBullet(
    canvas: HTMLCanvasElement,
    context: CanvasRenderingContext2D
  ) {
    const bulletStartPosition = this.createBulletStartPosition();
    const bullet = new Bullet(canvas, context, bulletStartPosition!)
    this.bullets.push(bullet)
    this.animateBullet(bullet, this.player.direction);
  }

  public animateBullet(bullet: Bullet, bulletDirection: string) {
    // @ts-ignore
    bullet[bulletDirection]();

    for (let i = 0; i < this.enemies.length; i++) {
      if (this.identifyHits(this.enemies[i], bullet, bulletDirection)) {
        bullet.flying = false;
        this.enemies.splice(i, 1);
        break;
      }
    }

    this.rerender()

    if (bullet.flying) {
      requestAnimationFrame(this.animateBullet.bind(this, bullet, bulletDirection));
    }
  };

  private identifyHits(enemy: Enemy, bullet: Bullet, bulletDirection: string) {
    if (bulletDirection = 'moveUp') {
      if (bullet.position.y <= enemy.position.y + Tank.size && bullet.position.x + Bullet.size > enemy.position.x && bullet.position.x < enemy.position.x + Tank.size) {
        return true;
      }
    } else if (bulletDirection = 'moveDown') {
      if (bullet.position.y + Bullet.size >= enemy.position.y && bullet.position.x + Bullet.size > enemy.position.x && bullet.position.x < enemy.position.x + Tank.size) {
        return true;
      }
    } else if (bulletDirection = 'moveLeft') {
      if (bullet.position.x <= enemy.position.x + Tank.size && bullet.position.y + Bullet.size > enemy.position.y && bullet.position.y < enemy.position.y + Tank.size) {
        return true;
      }
    } else if (bulletDirection = 'moveRight') {
      if (bullet.position.x >= enemy.position.x  && bullet.position.y + Bullet.size > enemy.position.y && bullet.position.y < enemy.position.y + Tank.size) {
        return true;
      }
    }
  }

  private createBulletStartPosition() {
    if (this.player.direction === 'moveUp') {
      return {
        x: this.player.position.x + (Tank.size - Bullet.size) / 2,
        y: this.player.position.y, 
      }
    } 
    if (this.player.direction === 'moveDown') {
      return {
        x: this.player.position.x + (Tank.size - Bullet.size) / 2,
        y: this.player.position.y + Tank.size, 
      }
    } 
    if (this.player.direction === 'moveLeft') {
      return {
        x: this.player.position.x,
        y: this.player.position.y + (Tank.size - Bullet.size) / 2, 
      }
    }
    if (this.player.direction === 'moveRight') {
      return {
        x: this.player.position.x + Tank.size,
        y: this.player.position.y + (Tank.size - Bullet.size) / 2, 
      }
    }
  }

  private rerender() {
    this.view.update()
    this.player.render()
    this.enemies.forEach(enemy => enemy.render())
    this.bullets = this.bullets.filter((item) => item.flying);
    this.bullets.forEach(bullet => bullet.render())
  }

  public init() {
    requestAnimationFrame(this.loop)
  }

  private loop() {
    requestAnimationFrame(this.loop)
  }
}
