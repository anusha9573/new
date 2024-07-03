import React, { createContext, useContext, useState } from 'react';
import axios from 'axios'

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [username, setUsername] = useState('');
    const [userId, setUserId] = useState('');

    // Function to set user ID from username
    const setUserIdFromUsername = async (username) => {
        try {
            // Fetch user details from the backend by username
            const response = await axios.get(`http://localhost:5000/api/users?username=${username}`);
            const userData = response.data;
            console.log("user data", userData)
            if (userData) {
                setUserId(userData._id);
            } else {
                console.error('User not found');
            }
        } catch (error) {
            console.error('Error fetching user data:', error);
        }
    };

    return (
        <AuthContext.Provider value={{ username, setUsername, userId, setUserId, setUserIdFromUsername }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
