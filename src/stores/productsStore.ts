import {defineStore} from "pinia";
import client from "../client";
import axios from 'axios'
import {IResponse, IResponseProductPaginated} from "../types";

export const useProductsStore = defineStore("products", {
    actions: {
        async getProducts(search: string = '', offset: number = 0): Promise<IResponse<IResponseProductPaginated>> {
            const url = `https://dummyjson.com/products?
                search=${search}
                &skip=${offset}
                &limit=20
                &select=id,title,description,images,thumbnail,rating,price,discountPercentage
            `
            const response = await client.get(url)
            if (response.status === axios.HttpStatusCode.Ok) {
                return {
                    status: true,
                    data: response.data
                }
            } else {
                return {
                    status: false,
                    data: response.data
                }
            }
        }
    }
})
