type ForumItemProps = {
  postId: number
  authorId: number
  authorNickName: string
  description: string
  content: string
  date?: Date
};

export const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};
export const tailLayout = {
  wrapperCol: {
    offset: 8,
    span: 16,
  }
};
