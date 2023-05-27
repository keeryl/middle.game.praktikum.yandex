import { View } from './View'
import { Enemy } from './Enemy'
import { Player } from './Player'
import { Bullet } from './Bullet'
import { getInitialPositions } from './config'
import { Tank } from './Tank'
import { getRandomNumber } from '../utils/getRandomNumber'
import { GameProps } from '../pages/Game/GameEnumProps'

export class World {
  canvas: HTMLCanvasElement
  context: CanvasRenderingContext2D
  view: View
  player: Player
  enemies: Enemy[]
  bullets: Bullet[]

  damagies: number
  maxDamagies: number
  CurrentGameProps: GameProps

  constructor(CurrentGameProps: GameProps) {
    this.CurrentGameProps = CurrentGameProps
    this.canvas = CurrentGameProps.canvas
    this.context = CurrentGameProps.context
    this.loop = this.loop.bind(this)
    this.view = new View(CurrentGameProps.canvas, CurrentGameProps.context)
    this.view.init()
    this.player = {} as Player
    this.enemies = []
    this.bullets = []
    this.spawnPlayer(CurrentGameProps.canvas, CurrentGameProps.context)
    this.spawnEnemies(CurrentGameProps.canvas, CurrentGameProps.context)
    this.setEventListeners()
    this.damagies = 0
    this.maxDamagies = 1
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

      if (
        e.code === 'ArrowUp' ||
        e.code === 'ArrowDown' ||
        e.code === 'ArrowLeft' ||
        e.code === 'ArrowRight'
      ) {
        for (let i = 0; i < this.enemies.length; i++) {
          if (
            this.identifyHits(
              this.enemies[i],
              this.player,
              this.player.direction
            )
          ) {
            const savedPlayerDirection = this.player.direction
            this.tankGoBack()
            this.player.direction = savedPlayerDirection
            break
          }
        }
        this.rerender()
      }

      if (e.code === 'Space') {
        this.spanBullet(this.canvas, this.context, this.player)
      }
    })
  }

  private spawnPlayer(
    canvas: HTMLCanvasElement,
    context: CanvasRenderingContext2D
  ) {
    this.player = new Player(canvas, context, getInitialPositions().PLAYER)
    this.player.render()
  }

  private spawnEnemies(
    canvas: HTMLCanvasElement,
    context: CanvasRenderingContext2D
  ) {
    getInitialPositions()
      .ENEMIES.splice(0, this.CurrentGameProps.gameLevel)
      .forEach(position => {
        this.enemies.push(new Enemy(canvas, context, position))
      })

    this.enemies.forEach(enemy => enemy.render())
  }

  private spanBullet(
    canvas: HTMLCanvasElement,
    context: CanvasRenderingContext2D,
    shooter: Enemy | Player
  ) {
    if (!shooter) {
      return
    }
    //@ts-ignore
    const bulletStartPosition: { x: number; y: number } =
      this.createBulletStartPosition(shooter)

    const bullet = new Bullet(this.canvas, this.context, bulletStartPosition)
    this.bullets.push(bullet)
    this.animateBullet(bullet, shooter.direction)
  }

  public animateBullet(bullet: Bullet, bulletDirection: string) {
    switch (bulletDirection) {
      case 'moveUp':
        bullet.moveUp()
        break
      case 'moveDown':
        bullet.moveDown()
        break
      case 'moveLeft':
        bullet.moveLeft()
        break
      case 'moveRight':
        bullet.moveRight()
        break
    }

    for (let i = 0; i < this.enemies.length; i++) {
      if (this.identifyHits(this.enemies[i], bullet, bulletDirection)) {
        // this.rerender()
        bullet.flying = false
        this.enemies.splice(i, 1)
        this.CurrentGameProps.addScore()
        if (this.enemies.length === 0) {
          this.CurrentGameProps.setGameStateWaitNextLevel()
          this.CurrentGameProps.setGameLevel()
        }
        break
      }
      this.rerender()
    }
    
    if (bullet.flying) {
      requestAnimationFrame(
        this.animateBullet.bind(this, bullet, bulletDirection)
      )
      
    }
  }

  private identifyHits(enemy: Enemy, object: Bullet | Tank, direction: string) {
    const objectClass = object.constructor.name === 'Bullet' ? Bullet : Tank
    if (
      object.position.y < enemy.position.y + Tank.size &&
      object.position.y + objectClass.size > enemy.position.y &&
      object.position.x + objectClass.size > enemy.position.x &&
      enemy.position.x + Tank.size > object.position.x
    ) {
      return true
    }
  }

  private enemyShoot() {
    if (this.enemies.length === 0) {
      return
    }
    const waitDelay1 = getRandomNumber(0, 1000)
    const waitDelay2 = getRandomNumber(900, 1300)
    if (waitDelay1 > waitDelay2) {
      const enemyShooter = getRandomNumber(0, this.enemies.length - 1)
      this.spanBullet(this.canvas, this.context, this.enemies[enemyShooter])
    }
  }

  private createBulletStartPosition(shooter: Enemy | Player) {
    if (!shooter) {
      return
    }

    if (shooter.direction === 'moveUp') {
      return {
        x: shooter.position.x + (Tank.size - Bullet.size) / 2,
        y: shooter.position.y,
      }
    } else if (shooter.direction === 'moveDown') {
      return {
        x: shooter.position.x + (Tank.size - Bullet.size) / 2,
        y: shooter.position.y + Tank.size,
      }
    } else if (shooter.direction === 'moveLeft') {
      return {
        x: shooter.position.x,
        y: shooter.position.y + (Tank.size - Bullet.size) / 2,
      }
    } else {
      return {
        x: shooter.position.x + Tank.size,
        y: shooter.position.y + (Tank.size - Bullet.size) / 2,
      }
    }
    
  }

  private tankGoBack() {
    switch (this.player.direction) {
      case 'moveUp':
        this.player.moveDown()
        break

      case 'moveDown':
        this.player.moveUp()
        break

      case 'moveLeft':
        this.player.moveRight()
        break

      case 'moveRight':
        this.player.moveLeft()
        break
    }
  }

  private rerender() {
    this.view.update()
    this.player.render()
    this.enemies.forEach(enemy => enemy.render())
    this.bullets = this.bullets.filter(item => item.flying)
    this.bullets.forEach(bullet => bullet.render())
  }

  public init() {
    requestAnimationFrame(this.loop)
  }

  private loop() {
    requestAnimationFrame(this.loop)
    this.enemyShoot()
  }
}
