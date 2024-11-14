import {defineStore} from "pinia";
import client from "../client";
import {renderResponse} from "../helpers";
import {useAuthenticationStore} from "./authenticationStore.ts";
import {IResponse, IResponseCartPaginated} from "../types";

export const useCartsStore = defineStore('carts', {
    actions: {
        async getMyCart(): Promise<IResponse<IResponseCartPaginated>> {
            const authStore = useAuthenticationStore()
            const url = `/carts/user/${authStore.user.id}/`
            const response = await client.get(url)
            return renderResponse<IResponseCartPaginated>(response)
        }
    }
})
