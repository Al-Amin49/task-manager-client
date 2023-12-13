import api from '../utils/axios';


const taskServices =  {
    async getTasks() {
        try {
          const response = await api.get('/api/tasks');
          return response.data;
        } catch (error) {
          console.error(`Error fetching tasks: ${error.message}`);
          throw new Error('Failed to fetch tasks');
        }
      },
    async addTask() {
        try {
          const response = await api.post('/api/tasks');
          return response.data;
        } catch (error) {
          console.error(`Error adding tasks: ${error.message}`);
          throw new Error('Failed to add tasks');
        }
      },
    async updateTask(taskId, updateTaskData) {
        try {
          const response = await api.patch(`/api/tasks/${taskId}`, updateTaskData);
          return response.data;
        } catch (error) {
          console.error(`Error updating tasks: ${error.message}`);
          throw new Error('Failed to update tasks');
        }
      },
    async deleteTask(taskId) {
        try {
          const response = await api.patch(`/api/tasks/${taskId}`);
          return response.data;
        } catch (error) {
          console.error(`Error delete tasks: ${error.message}`);
          throw new Error('Failed to delete tasks');
        }
      },
};

export default taskServices;