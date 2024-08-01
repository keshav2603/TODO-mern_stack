import api from "./api.js";

export const registerUser = async ({ name, email, password }) => {
    try {
      const response = await api.post('/api/v1/todo/register', { name, email, password });
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

  export const getUser = async ()=>{
    try{
      const response = await api.get('/get-user');
      return response.data;
    }catch ( error ){
      console.log("error while getting the user :" , error);
    }
  }

  
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
  