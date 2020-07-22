import axios from 'axios'
export const getMyCustomers = (async)=>{
    const options = {
        method: 'GET',
        url: process.env.REACT_APP_AUTH_TOKEN_URL,
        headers: {
            'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
        }
    }
}