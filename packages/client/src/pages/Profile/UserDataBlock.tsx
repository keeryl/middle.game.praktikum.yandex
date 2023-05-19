import { Col, Divider, Row, Button, Avatar, Form } from 'antd'
import styles from './profile.module.css'
import { useState } from 'react'
import { useAppSelector } from '../../store/hooks'
import { ChangePasswordModal } from './ChangePasswordModal'
import { ChangeProfileModal } from './ChangeProfileModal'
import { selectUserData } from '../../store/userSelectors'
import { BASE_URL_IMG } from '../../utils/constants'

export const UserDataBlock = () => {
  const user = useAppSelector(selectUserData)
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
        <Avatar
          size={128}
          src={!!user && user.avatar ? `${BASE_URL_IMG}${user.avatar}` : ''}
        />
        <Divider orientation="left"></Divider>
        <Row justify="space-around">
          <Col span={4}>Почта</Col>
          {!!user && <Col span={4}>{user.email}</Col>}
        </Row>
        <Divider orientation="left"></Divider>
        <Row justify="space-around">
          <Col span={4}>Логин</Col>
          {!!user && <Col span={4}>{user.login}</Col>}
        </Row>
        <Divider orientation="left"></Divider>
        <Row justify="space-around">
          <Col span={4}>Никнейм</Col>
          {!!user && (
            <Col span={4}>{user.display_name ? user.display_name : '-'}</Col>
          )}
        </Row>
        <Divider orientation="left"></Divider>
        <Row justify="space-around">
          <Col span={4}>Имя</Col>
          {!!user && <Col span={4}>{user.first_name}</Col>}
        </Row>
        <Divider orientation="left"></Divider>
        <Row justify="space-around">
          <Col span={4}>Фамилия</Col>
          {!!user && <Col span={4}>{user.second_name}</Col>}
        </Row>
        <Divider orientation="left"></Divider>
        <Row justify="space-around">
          <Col span={4}>Телефон</Col>
          {!!user && <Col span={4}>{user.phone}</Col>}
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
