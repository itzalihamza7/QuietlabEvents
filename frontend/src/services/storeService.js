import axios from 'axios';
import  BASE_URL from '../constants.js';

const user = JSON.parse(localStorage.getItem('user'));

export const getAllStores = async () => {
    console.log(BASE_URL)
    

    try {
        const response = await axios.get(`${BASE_URL}/getAllStores`, {
            headers: {
                Authorization: `${user.access_token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching stores:', error);
        throw error;
    }
};

export const createStore = async (storeData) => {
    try {
        const response = await axios.post(`${BASE_URL}/createStore`, storeData, {
            headers: {
                'Authorization': `${user.access_token}`,
                'Content-Type': 'application/json'
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error creating store:', error);
        throw error;
    }
};