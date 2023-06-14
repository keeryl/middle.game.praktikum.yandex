import { FC } from 'react'
import { Button } from 'antd'
import { UserCircle } from '../../components/UI/Avatar'
import styles from './styles.module.scss'
import { useNavigate } from 'react-router-dom'

const DEVELOPMENT_TEAM = [
  { name: 'Пронин Игорь', src: '' },
  { name: 'Участник 2', src: '' },
  { name: 'Участник 3', src: '' },
  { name: 'Участник 4', src: '' },
]

const SUPPORT_TEAM = [
  { name: 'Участник 1', src: '' },
  { name: 'Участник 2', src: '' },
]

export const Landing: FC = () => {
  const navigate = useNavigate()
  return (
    <div>
      <div className={styles.container}>
        <h1 className={styles.container__title}>
          ДОБРО ПОЖАЛОВАТЬ
          <br />В{' '}
          <span className={styles.container__title__gameName}>
            AWESOME BATTLE CITY
          </span>
        </h1>

        <Button
          type="primary"
          size="large"
          className={styles.container__button}
          onClick={() => navigate('/game')}>
          Играть
        </Button>

        <h2 className={styles.container__subtitle}>
          <b>AWESOME BATTLE CITY</b> - невероятно крутой ремейк культовой
          компьютерной игры <b>BATTLE CITY</b>, выпущенной для игровых приставок
          Famicom и Game Boy.
        </h2>

        <h3 className={styles.container__team}>Команда разработки</h3>

        <div
          className={
            styles.container__teamCircles +
            ' ' +
            styles.container__developmentTeam
          }>
          {DEVELOPMENT_TEAM.map(item => {
            return (
              <div key={item.name}>
                <UserCircle name={item.name} src={item.src} />
              </div>
            )
          })}
        </div>

        <h3 className={styles.container__team}>Команда поддержки</h3>

        <div
          className={
            styles.container__teamCircles + ' ' + styles.container__supportTeam
          }>
          {SUPPORT_TEAM.map(item => {
            return (
              <div key={item.name}>
                <UserCircle name={item.name} src={item.src} />
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
