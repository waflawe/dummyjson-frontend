import axios from 'axios'

function fetchClient() {
    const defaultOptions = {
        baseURL: 'https://dummyjson.com/',
    }

    let instance = axios.create(defaultOptions)

    instance.interceptors.request.use(function (config) {
        const token = localStorage.getItem('access')
        config.headers.Authorization = token ? `Bearer ${token}` : ''
        return config
    });

    return instance
}

export default fetchClient()
