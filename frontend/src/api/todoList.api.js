import api from "./api.js";

export const createTodoList = async (todoListData, token) => {
    try {
      const response = await api.post('/todolist', todoListData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error) {
      console.error('Error creating todo list', error);
      throw error;
    }
};

  
export const updateTodoList = async (todoListId, todoListData) => {
 try {
    const response = await api.put(`/todolist/${todoListId}`, todoListData);
      return response.data;
    } catch (error) {
      console.error('Error updating todo list', error);
      throw error;
    }
};
   
export const deleteTodoList = async (todoListId) => {
    try {
      const response = await api.delete(`/todolist/${todoListId}`);
      return response.data;
    } catch (error) {
      console.error('Error deleting todo list', error);
      throw error;
    }
  };

  
  export const getTodoList = async (todoListId) => {
    try {
      const response = await api.get(`/todolist/${todoListId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching todo list', error);
      throw error;
    }
  };
  