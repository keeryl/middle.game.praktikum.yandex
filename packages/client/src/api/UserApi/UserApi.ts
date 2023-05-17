import { UserUpdateRequestData, UserUpdatePasswordRequestData } from './types'

export class UserApi {
  private readonly baseUrl: string
  private readonly apiPath: string = 'user'

  constructor(baseUrl: string) {
    this.baseUrl = `${baseUrl}/${this.apiPath}`
  }

  private checkResponse(response: Response) {
    if (response.ok) {
      return response.json()
    }
    return Promise.reject(response.status)
  }

  public updateUserProfile(data: UserUpdateRequestData) {
    return fetch(`${this.baseUrl}/profile`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    }).then(this.checkResponse)
  }

  public updateUserPassword(data: UserUpdatePasswordRequestData) {
    return fetch(`${this.baseUrl}/password`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    }).then(this.checkResponse)
  }

  public updateUserAvatar(data: FormData) {
    return fetch(`${this.baseUrl}/profile/avatar`, {
      method: 'PUT',
      body: data
    }).then(this.checkResponse)
  }

}
