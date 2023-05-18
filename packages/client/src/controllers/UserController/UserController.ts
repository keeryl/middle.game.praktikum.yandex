import { UserApi } from '../../api/UserApi'
import { BASE_URL } from '../../utils/constants'
import {
  UserUpdateRequestData,
  UserUpdatePasswordRequestData,
} from '../../api/UserApi/types'

class UserController {
  private api: UserApi

  constructor() {
    this.api = new UserApi(BASE_URL)
  }

  public async updateUserProfile(data: UserUpdateRequestData) {
    try {
      const res = await this.api.updateUserProfile(data)
      return res
    } catch (e) {
      alert(e)
    }
  }

  public async updateUserPassword(data: UserUpdatePasswordRequestData) {
    try {
      const res = await this.api.updateUserPassword(data)
      return res
    } catch (e) {
      alert(e)
    }
  }

  public async updateUserAvatar(data: FormData) {
    try {
      const res = await this.api.updateUserAvatar(data)
      return res
    } catch (e) {
      alert(e)
    }
  }
}

export const userController = new UserController()
