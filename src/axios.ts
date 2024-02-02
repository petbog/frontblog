import axios from "axios"
// http://localhost:4444
// export const REACT_APP_API_URL = 'https://react-blog-x0l9.onrender.com'
// 'https://react-blog-x0l9.onrender.com'
const REACT_APP_API_URL = process.env.REACT_API_API_URL;

const instanse = axios.create({
    baseURL: REACT_APP_API_URL
})

//вшивается в заголовок аксиоса закрос на авторизацию по токену пользователя при каждом закросе и дальше проверяется в app
// в запросе появился Authorization
instanse.interceptors.request.use((config) => {
    config.headers.Authorization = window.localStorage.getItem('token')
    return config
})

export default instanse