import api from "./api.js";

export const registerUser = async (userData) => {
    try {
      const response = await api.post('/register', userData);
      return response.data;
    } catch (error) {
      console.error('Error registering user', error);
      throw error;
    }
  };

  export const loginUser = async (userData) => {
    try {
      const response = await api.post('/login', userData);
      return response.data;
    } catch (error) {
      console.error('Error logging in user', error);
      throw error;
    }
  };

  
  export const logoutUser = async (token) => {
    try {
      const response = await api.post('/logout', null, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error) {
      console.error('Error logging out user', error);
      throw error;
    }
  };
  