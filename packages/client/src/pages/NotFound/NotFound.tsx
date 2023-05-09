import { Link } from 'react-router-dom'
import styles from "../ServerError/styles.module.scss"

export const NotFound = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <img src="/public/notFoundPage/notFound.svg" alt="" className={styles.container__image} />

        <h1 className={styles.container__title}>Не туда попали</h1>

        <Link className={styles.container__link} to="/">
          На главную
        </Link>
      </div>
    </div>
  )
}
