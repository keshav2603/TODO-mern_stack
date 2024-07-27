import api from "./api.js";

export const createTodo = async (todolistId, todoData) => {
    try {
      const response = await api.post(`/todo/${todolistId}`, todoData);
      return response.data;
    } catch (error) {
      console.error('Error creating todo', error);
      throw error;
    }
};

export const updateTodo = async (todoId, todoData) => {
    try {
      const response = await api.put(`/todo/${todoId}`, todoData);
      return response.data;
    } catch (error) {
      console.error('Error updating todo', error);
      throw error;
    }
};

export const updateTodoCompletion = async (todoId, completionData) => {
  try {
    const response = await api.patch(`/todo/${todoId}`, completionData);
    return response.data;
  } catch (error) {
    console.error('Error updating todo completion', error);
    throw error;
  }
};

export const getTodo = async (todoId) => {
  try {
    const response = await api.get(`/todo/${todoId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching todo', error);
    throw error;
  }
};

export const deleteTodo = async (todoId) => {
  try {
    const response = await api.delete(`/todo/${todoId}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting todo', error);
    throw error;
  }
};


