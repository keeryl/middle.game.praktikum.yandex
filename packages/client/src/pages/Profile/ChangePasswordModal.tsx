import { Form, Modal, Input, Button } from 'antd'
import { TAIL_LAYOUT, LAYOUT } from './const'
import { ModalChangePasswordProps } from './types'

export const ChangePasswordModal = (modalProps: ModalChangePasswordProps) => {
  const {
    isModalOpenChangePassword,
    handleCancelChangePassword,
    onFinishChangePassword,
  } = modalProps
  const [formChangePassword] = Form.useForm()

  return (
    <>
      {' '}
      <Modal
        title="Изменить пароль"
        open={isModalOpenChangePassword}
        onCancel={handleCancelChangePassword}
        width={650}
        footer={[
          <Button key="back" onClick={handleCancelChangePassword}>
            Отмена
          </Button>,
        ]}>
        <Form
          {...LAYOUT}
          form={formChangePassword}
          name="change-password"
          onFinish={onFinishChangePassword}
          style={{
            maxWidth: 600,
          }}>
          <Form.Item
            name="old-pasword"
            label="Старый пароль"
            // type="password"
            rules={[
              {
                required: true,
              },
            ]}>
            <Input />
          </Form.Item>
          <Form.Item
            name="new-pasword"
            label="Новый пароль"
            rules={[
              {
                required: true,
              },
            ]}>
            <Input />
          </Form.Item>
          <Form.Item
            name="confirm-new-pasword"
            label="Повторите новый пароль"
            rules={[
              {
                required: true,
              },
            ]}>
            <Input />
          </Form.Item>
          <Form.Item {...TAIL_LAYOUT}>
            <Button type="primary" htmlType="submit">
              Сохранить
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  )
}
