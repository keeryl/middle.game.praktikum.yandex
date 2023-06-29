import { Form, Modal, Input, Button } from 'antd'
import styles from './forum.module.css'
import { useState } from 'react'
import { selectUserData } from '../../store/userSelectors'
import { useAppSelector } from '../../store/hooks'
import axios from 'axios'
import { useEffect } from "react";
import { AXIOS_BASE_URL } from '../../utils/constants'
import { Topic } from './Topic'
import { layout, tailLayout } from './const'


export const Forum = () => {

  const [posts, setPosts] = useState([]);
  const [initLoading, setInitLoading] = useState(false)
  
  const [loading, setLoading] = useState(true)


  useEffect(() => {
    axios.get(`${AXIOS_BASE_URL}/forum/topics`).then((response) => {
      setPosts(response.data);
      
    });
  },[initLoading] );
  
  const user = useAppSelector(selectUserData)

  const [isModalOpenAddPost, setIsModalOpenAddPost] = useState(false)
  const showModalAddPost = () => {
    setIsModalOpenAddPost(true)
  }
  const handleCancelAddPost = () => {
    setIsModalOpenAddPost(false)
  }

  const onFinishAddPost = (values: unknown) => {
    console.log(user, values)
    setInitLoading(true);
    axios.post(
      `${AXIOS_BASE_URL}/forum/topics`,
       {
      title: values.Description,
      body: values.Content,
      user_id: user.id
    }).then((response) => {
      setInitLoading(false);
    });
    setIsModalOpenAddPost(false)
  }
  const [formAddPost] = Form.useForm()
 

  return (
    <div className={styles.main}>
    <div className={styles.button}>
      <Button
        className={styles.button}
        block
        type="primary"
        htmlType="submit"
        onClick={showModalAddPost}
      >
        Создать тему
      </Button>
    </div>
     {posts.map(item => <Topic props={item} />)}
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
          <Button 
              type="primary"
              htmlType="submit"
              onClick={onFinishAddPost}>
              Сохранить
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  </div>
  )
}
