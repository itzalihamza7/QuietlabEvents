import axios from 'axios';
const BASE_URL = 'http://localhost:5000';
const user = JSON.parse(localStorage.getItem('user'));

export const getAllStores = async () => {
    

    try {
        const response = await axios.get(`${BASE_URL}/api/getAllStores`, {
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
        const response = await axios.post(`${BASE_URL}/api/createStore`, storeData, {
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