import { getUserTheme } from "./types"
import { updateUserTheme } from "./types"

export class ThemeApi {
    private readonly baseUrl: string
    private readonly apiPath: string = 'themes'

    constructor(baseUrl: string) {
        this.baseUrl = `${baseUrl}/${this.apiPath}`
    }

    private async checkResponse(response: Response) {
        if (response.ok) {
            return response.text()
        }
        return Promise.reject(response.status)
    }

    public getUserTheme(data: getUserTheme) {
        return fetch(`${this.baseUrl}/userTheme`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
            credentials: 'include',
        }).then(this.checkResponse)
    }

    public updateUserTheme(data: updateUserTheme) {
        return fetch(`${this.baseUrl}/userTheme`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
            credentials: 'include',
        }).then(this.checkResponse)
    }

    //   public signin(data: SigninData) {
    //     return fetch(`${this.baseUrl}/signin`, {
    //       method: 'POST',
    //       headers: {
    //         'Content-Type': 'application/json',
    //       },
    //       body: JSON.stringify(data),
    //       credentials: 'include',
    //     }).then(this.checkResponse)
    //   }

    //   public fetchUser() {
    //     return fetch(`${this.baseUrl}/user`, {
    //       method: 'GET',
    //       headers: {
    //         'Content-Type': 'application/json',
    //       },
    //       credentials: 'include',
    //     }).then(this.checkResponse)
    //   }

    //   public logOut() {
    //     return fetch(`${this.baseUrl}/logout`, {
    //       method: 'POST',
    //       headers: {
    //         'Content-Type': 'application/json',
    //       },
    //       credentials: 'include',
    //     }).then(this.checkResponse)
    //   }
}
