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

export interface IReview {
    rating: number,
    comment: string,
    date: string,
    reviewerName: string,
    reviewerEmail: string
}

export interface IProductDetail {
    id: number,
    title: string,
    description: string,
    price: number,
    category: string,
    discountPercentage: number,
    rating: number,
    thumbnail: string,
    images: Array<string>,
    reviews: Array<IReview>
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

interface IPaginated {
    total: number,
    skip: number,
    limit: number
}

export interface ICartProduct {
    id: number,
    title: string,
    price: number,
    quantity: number,
    total: number,
    discountedTotal: number,
    thumbnail: string
}

export interface ICart {
    id: number,
    products: Array<ICartProduct>
    total: number,
    discountedTotal: number
}

export interface IResponseProductPaginated extends IPaginated {
    products: Array<IProduct>
}

export interface IResponseCartPaginated extends IPaginated {
    carts: Array<ICart>
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
