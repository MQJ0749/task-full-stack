// // frontend/src/services/api.js
// import axios from 'axios';

// const api = axios.create({
//   baseURL: 'http://localhost:5000/api', // Replace with your backend API URL
// });

// export default api;
// api.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api', // Replace with your backend API URL
});

export const getTasksForProject = async (projectId) => {
  try {
    const response = await api.get('/tasks/project/${projectId}');
    return response.data;
  } catch (error) {
    console.error('Error fetching tasks for project:', error);
    throw error;
  }
};

export default api;
