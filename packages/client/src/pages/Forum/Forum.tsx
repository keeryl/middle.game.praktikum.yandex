import { Form, Modal, Input, Button, List, Skeleton } from 'antd'
import styles from './forum.module.css'
import { forumItemData } from './const'
import { useState } from 'react'

export const Forum = () => {
  const count = 3
  const [initLoading, setInitLoading] = useState(false)
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState([])
  const [list, setList] = useState([])

  const [isModalOpenAddPost, setIsModalOpenAddPost] = useState(false)
  const showModalAddPost = () => {
    setIsModalOpenAddPost(true)
  }
  const handleCancelAddPost = () => {
    setIsModalOpenAddPost(false)
  }

  const onFinishAddPost = (values: unknown) => {
    console.log(values)
  }
  const [formAddPost] = Form.useForm()
  const layout = {
    labelCol: {
      span: 8,
    },
    wrapperCol: {
      span: 16,
    },
  }
  const tailLayout = {
    wrapperCol: {
      offset: 8,
      span: 16,
    },
  }

  return (
    <div className={styles.main}>
      <div className={styles.button}>
        <Button
          className={styles.button}
          block
          type="primary"
          htmlType="submit"
          onClick={showModalAddPost}>
          Создать тему
        </Button>
      </div>
      <div className={styles.title}>
        <List
          className="demo-loadmore-list"
          loading={initLoading}
          itemLayout="horizontal"
          // loadMore={loadMore}
          dataSource={forumItemData}
          renderItem={item => (
            <List.Item
              actions={[
                <a key="list-loadmore-edit">edit</a>,
                <a key="list-loadmore-more">more</a>,
              ]}>
              <Skeleton avatar title={false} loading={false} active>
                <List.Item.Meta
                  title={item.description}
                  description={item.content}
                />
              </Skeleton>
            </List.Item>
          )}
        />
      </div>
      <Modal
        title="Добавить сообщение на форум"
        open={isModalOpenAddPost}
        onCancel={handleCancelAddPost}
        width={650}
        footer={[
          <Button key="back" onClick={handleCancelAddPost}>
            Отмена
          </Button>,
        ]}>
        <Form
          {...layout}
          form={formAddPost}
          name="addPost"
          onFinish={onFinishAddPost}
          style={{
            maxWidth: 600,
          }}>
          <Form.Item
            name="Description"
            label="Тема"
            // type="password"
            rules={[
              {
                required: true,
              },
            ]}>
            <Input />
          </Form.Item>
          <Form.Item
            name="Content"
            label="Текст сообщения"
            rules={[
              {
                required: true,
              },
            ]}>
            <Input />
          </Form.Item>
          <Form.Item {...tailLayout}>
            <Button type="primary" htmlType="submit">
              Сохранить
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}
