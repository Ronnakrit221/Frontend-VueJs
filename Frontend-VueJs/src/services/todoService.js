import axios from 'axios';

const API_URL = 'http://localhost:3000/api/todos';
const upcom = 'upcom'
export const getTodos = () => axios.get(API_URL);
export const createTodo = (todo) => axios.post(API_URL, todo);
export const updateCom = (id, data) => axios.put(`${API_URL}/${id}/${upcom}`, data);
export const updateTodo = (id, data) => axios.put(`${API_URL}/${id}`, data);
export const deleteTodo = (id) => axios.delete(`${API_URL}/${id}`);
