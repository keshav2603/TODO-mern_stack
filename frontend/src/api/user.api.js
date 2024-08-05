import api from "./api.js";

export const registerUser = async ({username, email, password }) => {
    try {
      const response = await api.post('/todo/register', { username, email, password });
      return response.data;
    } catch (error) {
      console.error('Error registering user', error);
      throw error;
    }
  };

  export const loginUser = async ({password, email}) => {
    try {
      const response = await api.post('/todo/login', {password, email});
      return response.data;
    } catch (error) {
      console.error('Error logging in user', error);
      throw error;
    }
  };

  export const getUser = async ()=>{
    try{
      const response = await api.get('/todo/get-user');
      return response.data;
    }catch ( error ){
      console.log("error while getting the user :" , error);
    }
  }

  
  export const logoutUser = async (token) => {
    try {
      const response = await api.post('/todo/logout', null, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error) {
      console.error('Error logging out user', error);
      throw error;
    }
  };
  