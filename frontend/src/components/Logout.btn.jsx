import React from 'react';
import { logoutUser } from '../api/user.api';
import { Cookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';

export default function LogOutBtn() {
    const cookies = new Cookies();
    const navigate = useNavigate();

    const handleLogout = async () => {
        const token = cookies.get('accessToken');
        console.log("Access Token:", token); // Debugging line

        if (!token) {
            console.error('No token found. Please log in.');
            return;
        }

        try {
            const response = await logoutUser(token); // Pass the token directly
            console.log("Logout Response:", response); // Debugging line

            // Assume a successful logout is indicated by a 204 status code
            if (response.status === 204) {
                cookies.remove('accessToken', { path: '/' });
                cookies.remove('refreshToken', { path: '/' });
                navigate('/');
            } else {
                console.error('Logout error:', response.data.message);
            }
        } catch (error) {
            console.error('Error logging out user', error);
        }
    };

    return (
        <button onClick={handleLogout}>
            Logout
        </button>
    );
}
