import { Form, Modal, Input, Button, Upload, message, UploadFile } from 'antd'
import { UploadChangeParam } from 'antd/es/upload'
import { LAYOUT, USER_DATA, TAIL_LAYOUT } from './const'
import { ModalChangeProfileProps } from './types'

export const ChangeProfileModal = (modalProps: ModalChangeProfileProps) => {
  const {
    isModalOpenChangeProfile,
    handleCancelChangeProfile,
    onFinishChangeProfile,
  } = modalProps
  const [formChangeProfile] = Form.useForm()
  const uploadProps = {
    name: 'file',
    action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
    headers: {
      authorization: 'authorization-text',
    },
    onChange(info: UploadChangeParam<UploadFile<any>>) {
      if (info.file.status === 'done') {
        message.success(`${info.file.name} file uploaded successfully`)
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} file upload failed.`)
      }
    },
  }

  return (
    <>
      <Modal
        title="Изменить данные"
        open={isModalOpenChangeProfile}
        onCancel={handleCancelChangeProfile}
        width={650}
        footer={[
          <Button key="back" onClick={handleCancelChangeProfile}>
            Отмена
          </Button>,
        ]}>
        <Form
          {...LAYOUT}
          form={formChangeProfile}
          name="change-profile"
          onFinish={onFinishChangeProfile}
          style={{
            maxWidth: 600,
          }}
          initialValues={{
            email: USER_DATA.email,
            login: USER_DATA.login,
            display_name: USER_DATA.display_name,
            first_name: USER_DATA.first_name,
            phone: USER_DATA.phone,
          }}>
          <Form.Item
            name="email"
            label="Почта"
            rules={[
              {
                required: true,
              },
            ]}>
            <Input />
          </Form.Item>
          <Form.Item
            name="login"
            label="Логин"
            rules={[
              {
                required: true,
              },
            ]}>
            <Input />
          </Form.Item>
          <Form.Item
            name="display_name"
            label="Никнейм"
            rules={[
              {
                required: true,
              },
            ]}>
            <Input />
          </Form.Item>
          <Form.Item
            name="first_name"
            label="Имя"
            rules={[
              {
                required: true,
              },
            ]}>
            <Input />
          </Form.Item>
          <Form.Item
            name="phone"
            label="Телефон"
            rules={[
              {
                required: true,
              },
            ]}>
            <Input />
          </Form.Item>
          <Form.Item {...TAIL_LAYOUT}>
            <Upload {...uploadProps}>
              <Button>Изменить аватар</Button>
            </Upload>
            <Button type="primary" htmlType="submit">
              Сохранить
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  )
}
