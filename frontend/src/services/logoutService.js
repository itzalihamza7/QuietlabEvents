import axios from 'axios';

export const logout = async () => {
    const BASE_URL = 'http://localhost:5000';
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
