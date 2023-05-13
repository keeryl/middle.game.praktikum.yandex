export type UserProps = {
  userId: number
  avatar: string
  email: string
  login: string
  display_name: string
  first_name: string
  phone: string
}

export type UserStatProps = {
  userId: number
  totalScore: number
  bestGame: number
  winnerCount: number
  defeatCount: number
  winRate: number
}

export type FileProps = {
  fileList: unknown
  file: {
    name: unknown
    status: unknown
  }
}

export type ModalChangeProfileProps = {
  isModalOpenChangeProfile: boolean
  handleCancelChangeProfile: () => void
  onFinishChangeProfile: () => void
}

export type ModalChangePasswordProps = {
  isModalOpenChangePassword: boolean
  handleCancelChangePassword: () => void
  onFinishChangePassword: () => void
}
