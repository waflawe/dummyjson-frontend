import {defineStore} from "pinia";
import {IAuthenticatedUser} from "../types";
import client from '../client'
import axios from 'axios'

export const useAuthenticationStore = defineStore('auth', {
    state() {
        return {
            user: {
                id: undefined,
                username: undefined,
                firstName: undefined,
                image: undefined
            } as IAuthenticatedUser,
            access: (localStorage.getItem('access') ?? '') as string,
            refresh: (localStorage.getItem('refresh') ?? '') as string,
            isAuth: (!!localStorage.getItem('access')) as boolean
        }
    },
    actions: {
        init() {
            if (localStorage.getItem('access')) {
                this.user = JSON.parse(localStorage.getItem('user')!)
                this.access = localStorage.getItem('access')!
                this.refresh = localStorage.getItem('refresh')!
                this.isAuth = true
            }
        },
        async login(username: string, password: string): Promise<boolean> {
            const response = await client.post('/auth/login', {
                username,
                password
            }, {headers: {'Content-Type': 'application/json'}})

            if (response.status === axios.HttpStatusCode.Ok) {
                this.user.id = response.data.id
                this.user.username = response.data.username
                this.user.firstName = response.data.firstName
                this.user.image = response.data.image

                this.access = response.data.accessToken
                this.refresh = response.data.refreshToken

                localStorage.setItem('user', JSON.stringify(this.user))
                localStorage.setItem('access', this.access)
                localStorage.setItem('refresh', this.refresh)

                this.isAuth = true

                return true
            }

            return false
        },
        logout(): void {
            if (this.isAuth) {
                this.user = {}
                localStorage.removeItem('user')
                localStorage.removeItem('access')
                localStorage.removeItem('refresh')
                this.isAuth = false
            }
        }
    }
})
