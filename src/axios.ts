import axios from "axios"




const instanse = axios.create({
    baseURL: process.env.REACT_APP_API_URL
})

//вшивается в заголовок аксиоса закрос на авторизацию по токену пользователя при каждом закросе и дальше проверяется в app
// в запросе появился Authorization
instanse.interceptors.request.use((config) => {
    config.headers.Authorization = window.localStorage.getItem('token')
    return config
})

export default instanse