import { useState } from "react";
import { Button } from "antd";
import styles from "./styles.module.scss"

export const Game = () => {
  const [buttonsList] = useState<Array<string>>(["Одиночная игра", "Сетевая игра", "Параметры"]);
  const [gameMode] = useState<string>("gameStart");

  return (
    <section>
      { gameMode === 'gameStart' &&
        <div className={styles.container}>
          <h1 className={styles.container__title}>AWESOME BATTLE CITY</h1>

          {buttonsList.map((item, index) => {
            return <div key={index}>
              <Button type="primary" className={styles.container__button}>{item}</Button>
            </div>
          })}
        </div>
      }
    </section>
  )
}
