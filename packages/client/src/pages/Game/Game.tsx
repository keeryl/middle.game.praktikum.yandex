import { useEffect, useRef, useState } from 'react'
import { Button } from 'antd'
import { World } from '../../game/World'
import styles from './styles.module.scss'
import { gameStore } from './GameStore'
import { GameState } from './GameEnum'


export const Game = () => {
  const [gameState, setGameState] = useState<string>(GameState.Menu)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  // console.log(gameStore);
  let game: World;
  useEffect(() => {
    if (gameStore.state === GameState.InProgress) {
      const canvas = canvasRef.current
      if (canvas) {
        const context = canvas.getContext('2d')
        if (context) {
          game = new World(canvas, context)
          game.init()
        }
      }
    }
    if (gameStore.state === GameState.WaitNextLevel) {
      console.log(123)
      }
  }, [gameStore.state]) //game
  
  
  if (gameStore.state === GameState.Menu) {
    
    return (
      <section>
        <div className={styles.container}>
          <h1 className={styles.container__title}>AWESOME BATTLE CITY</h1>
          <Button
            type="primary"
            className={styles.container__button}
            onClick={() => {
                gameStore.setGameState(GameState.InProgress)
                // setGameState(GameState.InProgress)
              }
            }>
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

  if (gameStore.state === GameState.InProgress) {
    {console.log(gameStore)}
    return (
      <div className={styles.container}>
        <canvas ref={canvasRef} width={800} height={800} />
        <Button
          type="primary"
          className={styles.container__button}
          onClick={() => {
            
            gameStore.setGameState(GameState.Finished)
            
          }}>
          Завершить
        </Button>
      </div>
    )
  }

  if (gameStore.state === GameState.Finished) {
   
    return (
      <section>
        <div className={styles.container}>
          <h1 className={styles.container__title}>AWESOME BATTLE CITY</h1>
          <h2 className={styles.container__subtitle}>Игра окончена</h2>
          <p className={styles.container__score}>
            Счёт: <span>{gameStore.score}</span>
          </p>
          <Button
            type="primary"
            className={styles.container__button}
            onClick={() => gameStore.setGameState(GameState.InProgress)}>
            Eщё раз
          </Button>
          <Button
            type="primary"
            className={styles.container__button}
            onClick={() => gameStore.setGameState(GameState.Menu)}>
            Главное меню
          </Button>
        </div>
      </section>
    )
  }

  if (gameStore.state === GameState.WaitNextLevel) {
    {console.log(gameStore)}
    return (
      <section>
        <div className={styles.container}>
          <h1 className={styles.container__title}>AWESOME BATTLE CITY</h1>
          <h2 className={styles.container__subtitle}>Уровень закончен</h2>
          <p className={styles.container__score}>
            Счёт: <span>{gameStore.score}</span>
          </p>
          <Button
            type="primary"
            className={styles.container__button}
            onClick={() => {
              console.log(gameStore.state)
              gameStore.setGameState(GameState.InProgress)
              console.log(gameStore.state)
            }
            }>
            Eщё раз
          </Button>
          <Button
            type="primary"
            className={styles.container__button}
            onClick={() => gameStore.setGameState(GameState.Menu)}>
            Главное меню
          </Button>
        </div>
      </section>
    )
  }

  return <></>
}
