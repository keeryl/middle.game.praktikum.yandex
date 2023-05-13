import styles from './profile.module.css'
import { UserStatBlock } from './UserStatBlock'
import { UserDataBlock } from './UserDataBlock'

export const Profile = () => {
  return (
    <main className={styles.main}>
      <UserDataBlock />
      <UserStatBlock />
    </main>
  )
}
