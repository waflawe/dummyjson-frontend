import {defineStore} from "pinia";
import client from "../client";
import {ICategory, IResponse, IResponseProductPaginated, ProductsOrder, ProductsSort} from "../types";
import {renderResponse} from "../helpers";

export const useProductsStore = defineStore("products", {
    actions: {
        async getProducts(category: string = '', offset: number = 0, sortBy: string = ProductsSort.TITLE, order: ProductsOrder = ProductsOrder.ASC): Promise<IResponse<IResponseProductPaginated>> {
            const baseUrl = category.length ? `/products/category/${category}` : '/products'
            const url = baseUrl + (
                `?skip=${offset}` +
                `&limit=51` +
                `&select=id,title,description,thumbnail,price,discountPercentage,rating,category` +
                `&sortBy=${sortBy}` +
                `&order=${order}`
            )
            const response = await client.get(url)
            return renderResponse<IResponseProductPaginated>(response)
        },
        async getCategories(): Promise<IResponse<Array<ICategory>>> {
            const url = '/products/categories/'
            const response = await client.get(url)
            return renderResponse<Array<ICategory>>(response)
        },
        async searchProducts(search: string) {
            const url = `/products/search?q=${search}`
            const response = await client.get(url)
            return renderResponse<IResponseProductPaginated>(response)
        }
    }
})
