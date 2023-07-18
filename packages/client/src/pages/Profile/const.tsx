import { UserProps, UserStatProps } from './types'

export const USER_DATA: UserProps = {
  userId: 1,
  avatar:
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ7TjyxXhIkwiNE1996F349Lr8xRDEyQ7r6cA&usqp=CAU',
  email: 'email@SizeContext.com',
  login: 'UserLogin',
  display_name: 'UserNickname',
  first_name: 'Nik',
  phone: '+79999999999',
}

export const USER_STAT_DATA: UserStatProps = {
  userId: 1,
  totalScore: 50,
  bestGame: 552,
  winnerCount: 10,
  defeatCount: 55,
  winRate: 72,
}

export const LAYOUT = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
}

export const TAIL_LAYOUT = {
  wrapperCol: {
    offset: 8,
    span: 16,
  },
}
