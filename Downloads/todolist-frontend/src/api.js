import axios from 'axios';

export const fetchTasks = () => {
  return axios.get('http://localhost:5000/api/tasks');
};

export const addTask = (task) => {
  return axios.post('http://localhost:5000/api/tasks', task);
};

export const updateTask = (taskId, updatedTask) => {
  return axios.put(`http://localhost:5000/api/tasks/${taskId}`, updatedTask);
};

export const deleteTask = (taskId) => {
  return axios.delete(`http://localhost:5000/api/tasks/${taskId}`);
};
