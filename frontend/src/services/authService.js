import axios from 'axios';

const API_URL = 'http://localhost:5000/api/'; 

export const login = async (email, password) => {
    return await axios.post(`${API_URL}login`, { email, password });
};

