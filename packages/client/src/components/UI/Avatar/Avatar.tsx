import { FC } from "react"
import { Avatar } from "antd"
import styles from "./styles.module.scss"

export interface UserCircleProps {
    name: string,
    src: string,
}

export const UserCircle: FC<UserCircleProps> = ({name, src}) => {
   return <div className={styles.container}>
       <Avatar className={styles.container__avatar} src={src}>User</Avatar>
       <span className={styles.container__text}>{name}</span>
   </div>
}
