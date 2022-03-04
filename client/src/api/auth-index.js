import axios from 'axios'

const api = axios.create({
    baseURL: 'http://localhost:3000/api',
})

export const authenticate = payload => api.post(`/signin`, payload)
export const getCookies = () => api.get('/read-cookie')


const apis = {
    authenticate,
    getCookies,
    
}

export default apis
