import { useEffect, useRef, useState } from 'react'
import { Button } from 'antd'
import { World } from '../../game/World'
import styles from './styles.module.scss'

enum GameState {
  Menu = 'Menu',
  InProgress = 'InProgress',
  Finished = 'Finished',
}

export const Game = () => {
  const [gameState, setGameState] = useState<string>(GameState.Menu)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (gameState === GameState.InProgress) {
      const canvas = canvasRef.current
      if (canvas) {
        const context = canvas.getContext('2d')
        if (context) {
          const game = new World(canvas, context)
          game.init()
        }
      }
    }
  }, [gameState])

  if (gameState === GameState.Menu) {
    return (
      <section>
        <div className={styles.container}>
          <h1 className={styles.container__title}>AWESOME BATTLE CITY</h1>
          <Button
            type="primary"
            className={styles.container__button}
            onClick={() => setGameState(GameState.InProgress)}>
            Одиночная игра
          </Button>
          <Button type="primary" className={styles.container__button} disabled>
            Сетевая игра
          </Button>
          <Button type="primary" className={styles.container__button} disabled>
            Параметры
          </Button>
        </div>
      </section>
    )
  }

  if (gameState === GameState.InProgress) {
    return (
      <div className={styles.container}>
        <canvas ref={canvasRef} width={800} height={800} />
        <Button
          type="primary"
          className={styles.container__button}
          onClick={() => setGameState(GameState.Finished)}>
          Завершить
        </Button>
      </div>
    )
  }

  if (gameState === GameState.Finished) {
    return (
      <section>
        <div className={styles.container}>
          <h1 className={styles.container__title}>AWESOME BATTLE CITY</h1>
          <h2 className={styles.container__subtitle}>Игра окончена</h2>
          <p className={styles.container__score}>
            Счёт: <span>770</span>
          </p>
          <Button
            type="primary"
            className={styles.container__button}
            onClick={() => setGameState(GameState.InProgress)}>
            Eщё раз
          </Button>
          <Button
            type="primary"
            className={styles.container__button}
            onClick={() => setGameState(GameState.Menu)}>
            Главное меню
          </Button>
        </div>
      </section>
    )
  }

  return <></>
}
