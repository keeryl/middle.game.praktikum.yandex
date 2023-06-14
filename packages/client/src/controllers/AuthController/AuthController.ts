import { AuthApi } from '../../api/AuthApi'
import { BASE_URL } from '../../utils/constants'
import { SigninData, SignupData } from '../../api/AuthApi/types'
import { apiErrorsHandler } from '../../utils/apiErrorsHandler'

class AuthController {
  private api: AuthApi

  constructor() {
    this.api = new AuthApi(BASE_URL)
  }

  public async signup(data: SignupData) {
    try {
      await this.api.signup(data)
    } catch (e) {
      apiErrorsHandler(e as number)
    }
  }

  public async signin(data: SigninData) {
    try {
      await this.api.signin(data)
    } catch (e) {
      apiErrorsHandler(e as number)
    }
  }

  public async fetchUser() {
    try {
      const res = await this.api.fetchUser()
      return res
    } catch (e) {
      console.error(e)
    }
  }

  public async logOut() {
    try {
      const res = await this.api.logOut()
      return res
    } catch (e) {
      apiErrorsHandler(e as number)
    }
  }
}

export const authController = new AuthController()
