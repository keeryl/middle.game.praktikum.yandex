import { Link } from 'react-router-dom'
import styles from './styles.module.scss'
import serverErrorPageBg from '../../assets/images/serverErrorPageBg.png'

export const ServerError = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <img
          src={serverErrorPageBg}
          alt=""
          className={styles.container__image}
        />

        <h1 className={styles.container__title}>Что-то пошло не так :(</h1>

        <Link className={styles.container__link} to="/">
          На главную
        </Link>
      </div>
    </div>
  )
}
