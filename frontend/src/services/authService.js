import axios from 'axios';
import  BASE_URL from '../constants.js';

export const login = async (email, password) => {
    return await axios.post(`${BASE_URL}/login`, { email, password });
};

