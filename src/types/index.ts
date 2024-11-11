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
    price: number,
    discountPercentage: number,
    rating: number,
    thumbnail: string
    images: Array<string>
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
