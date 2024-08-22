import axios from 'axios';
import qs from 'qs';
import BASE_URL from '../constants.js';


export const calculateMetrics = async (filters) => {
    try {
        const queryString = qs.stringify(filters);
        const user = JSON.parse(localStorage.getItem('user'));
        const accessToken = user?.access_token;

        const response = await axios.get(`${BASE_URL}/calculateMetrics?${queryString}`, {
            headers: {
                'Authorization': `${accessToken}`
            }
        });

        return response.data;
    } catch (error) {
        console.error("Error fetching metrics:", error);
        throw error;
    }
};
