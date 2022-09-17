import axios from 'axios'
import { SERVER_URL } from './service.url';

export const login = async (data) => {
    try {
        const res = await axios.post(`${SERVER_URL}/login`, { ...data }, { withCredentials: true })
        return res;
    }
    catch (err) {
        return err;
    }
}
export const register = async (data) => {
    try {
        const res = await axios.post(`${SERVER_URL}/register`, { ...data }, { withCredentials: true })
        return res;
    }
    catch (err) {
        return err
    }
}

