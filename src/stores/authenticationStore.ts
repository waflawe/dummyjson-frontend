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
            refresh: (localStorage.getItem('refresh') ?? '') as string
        }
    },
    actions: {
        async login(username: string, password: string): Promise<boolean> {
            const response = await client.post('https://dummyjson.com/auth/login', {
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

                localStorage.setItem('access', this.access)
                localStorage.setItem('refresh', this.refresh)

                return true
            }

            return false
        }
    }
})
