import { Col, Divider, Row } from 'antd'
import styles from './profile.module.css'
import { USER_STAT_DATA } from './const'

export const UserStatBlock = () => {
  return (
    <div className={styles.block}>
      <>
        <span className={styles.label1}>Статистика</span>
        <Divider orientation="left"></Divider>
        <Row justify="space-around">
          <Col span={10}>Всего очков</Col>
          <Col span={4}>{USER_STAT_DATA.totalScore}</Col>
        </Row>
        <Divider orientation="left"></Divider>
        <Row justify="space-around">
          <Col span={10}>Лучшая игра</Col>
          <Col span={4}>{USER_STAT_DATA.bestGame}</Col>
        </Row>
        <Divider orientation="left"></Divider>
        <Row justify="space-around">
          <Col span={10}>Побед</Col>
          <Col span={4}>{USER_STAT_DATA.winnerCount}</Col>
        </Row>
        <Divider orientation="left"></Divider>
        <Row justify="space-around">
          <Col span={10}>Поражений</Col>
          <Col span={4}>{USER_STAT_DATA.defeatCount}</Col>
        </Row>
        <Divider orientation="left"></Divider>
        <Row justify="space-around">
          <Col span={10}>Винрейт</Col>
          <Col span={4}>{USER_STAT_DATA.winRate}</Col>
        </Row>
      </>
    </div>
  )
}
