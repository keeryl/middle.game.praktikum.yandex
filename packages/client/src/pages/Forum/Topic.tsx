import { Form, Modal, Input, Button, List, Skeleton } from 'antd'
import styles from './forum.module.css'
import { useState } from 'react'
import axios from 'axios'
import { useEffect } from "react";
import { AXIOS_BASE_URL } from '../../utils/constants'
import { layout, tailLayout } from './const'

export const Topic = (props: any) => {
    const topicData = props.props;
    const [comments, setComments] = useState([]);
    const [initLoadingComment, setInitLoadingComment] = useState(false)
    const [isModalOpenAddComment, setIsModalOpenAddComment] = useState(false)
    

    useEffect(() => {
      axios.get(`${AXIOS_BASE_URL}/forum/comments/bytopicid/${props.props.id}`).then((response) => {
        setComments(response.data);
      });
    },[initLoadingComment] );
    
    const showModalAddComment = () => {
      setIsModalOpenAddComment(true)
    }
    const handleCancelAddComment = () => {
      setIsModalOpenAddComment(false)
    }
  
    const onFinishAddComment = (values: any) => {
    
      setInitLoadingComment(true);
      axios.post(
        `${AXIOS_BASE_URL}/forum/comments/`,
         {
           message: values.Comment,
           parent_id: null,
           user_id: props.props.user_id,
           topic_id: props.props.id
      }).then((response) => {
        setInitLoadingComment(false);
      });
      setIsModalOpenAddComment(false)
    }
    const [formAddPost] = Form.useForm()
    return (
   
      <div className={styles.title}>
        <List
          className="demo-loadmore-list"
          loading={initLoadingComment}
          itemLayout="horizontal"
          dataSource={[topicData]}
          renderItem={item => (
            <List.Item>
              <Skeleton avatar title={false} loading={false} active>
                <List.Item.Meta
                  title={item.title}
                  description={item.body}
                />
              </Skeleton>
              <Button
                onClick={showModalAddComment}
              > Создать Комментарий
              </Button>
            </List.Item>
          )}
          
        />
        <List
          className="demo-loadmore-list"
          loading={initLoadingComment}
          itemLayout="horizontal"
          dataSource={comments}
          renderItem={item => (
            <List.Item>
              <Skeleton avatar title={false} loading={false} active>
                <List.Item.Meta
                  description={(item as any).message}
                />
              </Skeleton>
            </List.Item>
          )}
          
        />
        <Modal
        title="Добавить комментарий"
        open={isModalOpenAddComment}
        onCancel={handleCancelAddComment}
        width={650}
        footer={[
          <Button key="back" onClick={handleCancelAddComment}>
            Отмена
          </Button>,
        ]}>
        <Form
          {...layout}
          form={formAddPost}
          name="addCoomment" //onFinishAddComment
          onFinish={onFinishAddComment}
          style={{
            maxWidth: 600,
          }}>
          <Form.Item
            name="Comment"
            label="Текст комментария"
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
              onClick={onFinishAddComment}
              >
              Сохранить
          </Button>
        </Form.Item>
      </Form>
    </Modal>
    </div>
    )
};
