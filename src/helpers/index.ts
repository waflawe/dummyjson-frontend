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
