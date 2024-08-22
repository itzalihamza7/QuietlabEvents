import axios from 'axios';
import BASE_URL from '../constants';


export const logout = async () => {
    try {
        const user = JSON.parse(localStorage.getItem('user'));
        const accessToken = user?.access_token;
        console.log("accessToken:", accessToken);
        await axios.delete(`${BASE_URL}/logout`, {
            headers: {
                'Authorization': `${accessToken}`
            }
        });

        // Clear user data from localStorage
        localStorage.removeItem('user');

        // Redirect to login page
        window.location.href = '/login';
    } catch (error) {
        console.error("Error logging out:", error);
        throw error;
    }
};
