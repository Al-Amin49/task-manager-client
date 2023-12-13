import createAxiosInstance from "../utils/axios";


const baseURL = 'http://localhost:8000/';
const api = createAxiosInstance(baseURL);

const taskServices =  {
    async getTasks() {
        try {
            
            const response = await api.get('/api/v1/tasks');
            
            return response.data;
        } catch (error) {
          console.error(`Error fetching tasks: ${error}`);
          throw new Error('Failed to fetch tasks');
        }
      },
    async addTask() {
        try {
            console.log("Before API Call post");
          const response = await api.post('/api/v1/tasks');
          console.log("after API Call post");
          return response.data;
        } catch (error) {
          console.error(`Error adding tasks: ${error.message}`);
          throw new Error('Failed to add tasks');
        }
      },
    async updateTask(taskId, updateTaskData) {
        try {
          const response = await api.patch(`/api/v1/tasks/${taskId}`, updateTaskData);
          return response.data;
        } catch (error) {
          console.error(`Error updating tasks: ${error.message}`);
          throw new Error('Failed to update tasks');
        }
      },
    async deleteTask(taskId) {
        try {
          const response = await api.delete(`/api/v1/tasks/${taskId}`);
          return response.data;
        } catch (error) {
          console.error(`Error delete tasks: ${error.message}`);
          throw new Error('Failed to delete tasks');
        }
      },
};

export default taskServices;