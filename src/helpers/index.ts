import {AxiosResponse, HttpStatusCode} from "axios";
import {IResponse} from "../types";

export function renderResponse<T>(response: AxiosResponse, expectedStatus: number = HttpStatusCode.Ok): IResponse<T> {
    if (response.status === expectedStatus) {
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

export function humanReadableCategory(categorySlug: string) {
    let res: string = ''
    for (let i = 0; i < categorySlug.length; i++) {
        if (i === 0) {
            res += (categorySlug[0] as string).toUpperCase()
        } else if (categorySlug[i] === '-') {
            res += ' '
        } else if (categorySlug[i - 1] === '-') {
            res += (categorySlug[i] as string).toUpperCase()
        } else {
            res += categorySlug[i]
        }
    }
    return res
}
