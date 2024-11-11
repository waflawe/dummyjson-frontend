import axios from 'axios'

function fetchClient() {
    let instance = axios.create()

    instance.interceptors.request.use(function (config) {
        const token = localStorage.getItem('access')
        config.headers.Authorization = token ? `Bearer ${token}` : ''
        return config
    });

    return instance
}

export default fetchClient()
