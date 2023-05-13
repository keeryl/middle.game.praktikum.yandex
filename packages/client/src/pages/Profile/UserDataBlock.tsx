import { Col, Divider, Row, Button, Avatar, Form } from 'antd'
import styles from './profile.module.css'
import { USER_DATA } from './const'
import { useState } from 'react'
// import { showModalChangePassword, showModalChangeProfile } from "./functions";
import { ChangePasswordModal } from './ChangePasswordModal'
import { ChangeProfileModal } from './ChangeProfileModal'
/* <ChangePasswordModal />
        <ChangeProfileModal /> */

export const UserDataBlock = () => {
  const [isModalOpenChangeProfile, setIsModalOpenChangeProfile] =
    useState(false)

  const showModalChangeProfile = () => {
    setIsModalOpenChangeProfile(true)
  }
  const handleCancelChangeProfile = () => {
    setIsModalOpenChangeProfile(false)
  }

  const onFinishChangeProfile = () => {
    setIsModalOpenChangeProfile(false)
  }

  const [isModalOpenChangePassword, setIsModalOpenChangePassword] =
    useState(false)
  const showModalChangePassword = () => {
    setIsModalOpenChangePassword(true)
  }
  const handleCancelChangePassword = () => {
    setIsModalOpenChangePassword(false)
  }
  const onFinishChangePassword = () => {
    setIsModalOpenChangePassword(false)
  }

  return (
    <div className={styles.block}>
      <>
        <Avatar size={128} src={USER_DATA.avatar} />
        <Divider orientation="left"></Divider>
        <Row justify="space-around">
          <Col span={4}>Почта</Col>
          <Col span={4}>{USER_DATA.email}</Col>
        </Row>
        <Divider orientation="left"></Divider>
        <Row justify="space-around">
          <Col span={4}>Логин</Col>
          <Col span={4}>{USER_DATA.login}</Col>
        </Row>
        <Divider orientation="left"></Divider>
        <Row justify="space-around">
          <Col span={4}>Никнейм</Col>
          <Col span={4}>{USER_DATA.display_name}</Col>
        </Row>
        <Divider orientation="left"></Divider>
        <Row justify="space-around">
          <Col span={4}>Имя</Col>
          <Col span={4}>{USER_DATA.first_name}</Col>
        </Row>
        <Divider orientation="left"></Divider>
        <Row justify="space-around">
          <Col span={4}>Телефон</Col>
          <Col span={4}>{USER_DATA.phone}</Col>
        </Row>

        <div className={styles.buttonblock}>
          <Button
            className={styles.button}
            block
            type="primary"
            htmlType="submit"
            onClick={showModalChangeProfile}>
            Pедактировать
          </Button>
          <Button
            className={styles.button}
            block
            type="primary"
            htmlType="submit"
            onClick={showModalChangePassword}>
            Изменить пароль
          </Button>
          <ChangeProfileModal
            isModalOpenChangeProfile={isModalOpenChangeProfile}
            handleCancelChangeProfile={handleCancelChangeProfile}
            onFinishChangeProfile={onFinishChangeProfile}
          />
          <ChangePasswordModal
            isModalOpenChangePassword={isModalOpenChangePassword}
            handleCancelChangePassword={handleCancelChangePassword}
            onFinishChangePassword={onFinishChangePassword}
          />
        </div>
      </>
    </div>
  )
}
