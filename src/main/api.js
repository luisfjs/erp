import axios from 'axios';
import consts from '../consts'

export default axios.create({
    baseURL: consts.BASE_URL,
    headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': '*',
        'Access-Control-Allow-Headers': '*',
        'Content-Type': 'application/json',
        'Access-Control-Expose-Headers': 'Access-Token, Uid, xsrf-token'
    }
})