export interface IAuthenticatedUser {
    id?: number
    username?: string,
    firstName?: string,
    image?: string
}

export interface IProduct {
    id: number,
    title: string,
    description: string,
    rating: number,
    price: number,
    category: string,
    discountPercentage: number,
    thumbnail: string
}

export interface IProductDetail {
    id: number,
    title: string,
    description: string,
    price: number,
    discountPercentage: number,
    rating: number,
    thumbnail: string
    images: Array<string>
}

export interface ICategory {
    slug: string,
    name: string,
    url: string
}

export enum ProductsOrder {
    ASC = 'asc',
    DESC = 'desc'
}

export enum ProductsSort {
    TITLE = 'title',
    RATING = 'rating',
    PRICE = 'price',
    DISCOUNT_PERCENTAGE = 'discountPercentage',
}

export interface IResponseProductPaginated {
    products: Array<IProduct>
    total: number,
    skip: number,
    limit: number
}

export interface IResponse<D> {
    status: boolean
    data: D
}

export interface ISortOptions {
    titleAsc: string,
    titleDesc: string,
    ratingAsc: string,
    ratingDesc: string,
    priceAsc: string,
    priceDesc: string,
    discountPercentageAsc: string,
    discountPercentageDesc: string
}
