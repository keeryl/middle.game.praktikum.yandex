import { getUserTheme } from "../../api/ThemeApi/types"
import { updateUserTheme } from "../../api/ThemeApi/types"
import { ThemeApi } from '../../api/ThemeApi'
import { NODE_URL } from '../../utils/constants'
import { apiErrorsHandler } from '../../utils/apiErrorsHandler'

class ThemeController {
  private api: ThemeApi

  constructor() {
    this.api = new ThemeApi(NODE_URL)
  }

  public async getUserTheme(data: getUserTheme) {
    try {
      return await this.api.getUserTheme(data)
    } catch (e) {
      apiErrorsHandler(e as number)
    }
  }

  public async updateUserTheme(data: updateUserTheme) {
    try {
      return await this.api.updateUserTheme(data)
    } catch (e) {
      apiErrorsHandler(e as number)
    }
  }

//   public async signin(data: SigninData) {
//     try {
//       await this.api.signin(data)
//     } catch (e) {
//       apiErrorsHandler(e as number)
//     }
//   }

//   public async fetchUser() {
//     try {
//       const res = await this.api.fetchUser()
//       return res
//     } catch (e) {
//       console.error(e)
//     }
//   }

//   public async logOut() {
//     try {
//       const res = await this.api.logOut()
//       return res
//     } catch (e) {
//       apiErrorsHandler(e as number)
//     }
//   }
}

export const themeController = new ThemeController()
