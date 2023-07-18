export interface UserUpdateRequestData {
  first_name: string
  second_name: string
  display_name: string
  login: string
  email: string
  phone: string
}

export interface UserUpdatePasswordRequestData {
  oldPassword: string
  newPassword: string
}
