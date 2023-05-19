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
      }
      if (e.code === 'ArrowDown') {
        this.player.moveDown()
      }
      if (e.code === 'ArrowLeft') {
        this.player.moveLeft()
      }
      if (e.code === 'ArrowRight') {
        this.player.moveRight()
      }

      if (e.code === 'ArrowUp' || e.code === 'ArrowDown' || e.code === 'ArrowLeft' || e.code === 'ArrowRight') {
        for (let i = 0; i < this.enemies.length; i++) {
          if (this.identifyHits(this.enemies[i], this.player, this.player.direction)) {
            const savedPlayerDirection = this.player.direction
            this.tankGoBack();
            this.player.direction = savedPlayerDirection;
            break;
          }
        }
        this.rerender();
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
    const bullet = new Bullet(canvas, context, bulletStartPosition);
    this.bullets.push(bullet)
    this.animateBullet(bullet, this.player.direction);
  }

  public animateBullet(bullet: Bullet, bulletDirection: string) {
    // bullet[bulletDirection]();
    switch (bulletDirection) {
      case ('moveUp'):
        bullet.moveUp();
        break;

      case ('moveDown'):
        bullet.moveDown();
        break;

      case ('moveLeft'):
        bullet.moveLeft();
        break;

      case ('moveRight'):
        bullet.moveRight();
        break;
    }

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

  private identifyHits(enemy: Enemy, object: Bullet | Tank, direction: string) {
    const objectClass = object.constructor.name === 'Bullet' ? Bullet : Tank;
    if (object.position.y < enemy.position.y + Tank.size && object.position.y + objectClass.size > enemy.position.y && object.position.x + objectClass.size > enemy.position.x && enemy.position.x + Tank.size > object.position.x) {
      return true
    }
  }

  private createBulletStartPosition() {
    if (this.player.direction === 'moveUp') {
      return {
        x: this.player.position.x + (Tank.size - Bullet.size) / 2,
        y: this.player.position.y,
      }
    } else
      if (this.player.direction === 'moveDown') {
        return {
          x: this.player.position.x + (Tank.size - Bullet.size) / 2,
          y: this.player.position.y + Tank.size,
        }
      } else
        if (this.player.direction === 'moveLeft') {
          return {
            x: this.player.position.x,
            y: this.player.position.y + (Tank.size - Bullet.size) / 2,
          }
        } else {
          return {
            x: this.player.position.x + Tank.size,
            y: this.player.position.y + (Tank.size - Bullet.size) / 2,
          }
        }
  }

  private tankGoBack() {
    switch (this.player.direction) {
      case ('moveUp'):
        this.player.moveDown();
        break;

      case ('moveDown'):
        this.player.moveUp();
        break;

      case ('moveLeft'):
        this.player.moveRight();
        break;

      case ('moveRight'):
        this.player.moveLeft();
        break;
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
