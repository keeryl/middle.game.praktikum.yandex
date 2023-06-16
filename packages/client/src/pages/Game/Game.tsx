import { useEffect, useRef, useState } from 'react'
import { Button } from 'antd'
import { World } from '../../game/World'
import styles from './styles.module.scss'
import { GameState } from './GameEnumProps'

export const Game = () => {
  const [gameState, setGameState] = useState<string>(GameState.Menu)
  const [gameScore, setGameScore] = useState<number>(0)
  const [gameLevel, setGameLevelState] = useState<number>(1)

  const setGameStateMenu = () => {
    setGameState(GameState.Menu)
  }
  const setGameStateInProgress = () => {
    setGameState(GameState.InProgress)
  }
  const setGameStateFinished = () => {
    setGameState(GameState.Finished)
  }
  const setGameStateGameOver = () => {
    setGameState(GameState.GameOver)
  }
  const setGameStateWaitNextLevel = () => {
    setGameState(GameState.WaitNextLevel)
  }
  const setGameStateNextLevel = () => {
    setGameState(GameState.NextLevel)
  }
  const addScore = () => {
    const s = gameScore + 1
    setGameScore(s)
  }
  const setGameLevel = () => {
    const l = gameLevel + 1
    setGameLevelState(l)
    document.exitPointerLock()
  }

  const canvasRef = useRef<HTMLCanvasElement>(null)
  let game: World
  useEffect(() => {
    if (gameState === GameState.InProgress) {
      const canvas = canvasRef.current
      if (canvas) {
        const context = canvas.getContext('2d')
        if (context) {
          game = new World({
            canvas,
            context,
            setGameStateMenu,
            setGameStateInProgress,
            setGameStateFinished,
            setGameStateGameOver,
            setGameStateWaitNextLevel,
            setGameStateNextLevel,
            addScore,
            gameLevel,
            setGameLevel,
          })
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
            onClick={() => {
              setGameState(GameState.InProgress)
            }}>
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
        <canvas ref={canvasRef} width={800} height={800} 
        onClick={() =>{
          document.body.requestPointerLock();
        }}/>
        <Button
          type="primary"
          className={styles.container__button}
          onClick={() => {
            setGameLevelState(1)
            setGameScore(0)
            setGameState(GameState.Finished)
          }}>
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
            Счёт: <span>{gameScore}</span>
          </p>
          <Button
            type="primary"
            className={styles.container__button}
            onClick={() => {
              setGameState(GameState.InProgress)
            }}>
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

  if (gameState === GameState.WaitNextLevel) {
    return (
      <section>
        <div className={styles.container}>
          <h1 className={styles.container__title}>AWESOME BATTLE CITY</h1>
          <h2 className={styles.container__subtitle}>Уровень закончен</h2>
          <p className={styles.container__score}>
            Счёт: <span>{gameScore}</span>
          </p>
          <Button
            type="primary"
            className={styles.container__button}
            onClick={() => {
              setGameState(GameState.InProgress)
            }}>
            Следующий уровень
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
