export interface SignupData {
  first_name: string
  second_name: string
  display_name?: string
  login: string
  email: string
  password: string
  phone: string
}

export interface SigninData {
  login: string
  password: string
}

export interface UserData {
  id: number
  first_name: string
  second_name: string
  display_name?: string
  login: string
  email: string
  password: string
  phone: string
  avatar?: string
}
