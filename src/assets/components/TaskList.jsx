
import { useEffect } from "react";
import { useState } from "react";
import taskServices from "../../services/TaskServices";
import { FaEdit } from "react-icons/fa";
import { RiDeleteBinLine } from "react-icons/ri";
const TaskList = ({todos}) => {
  const [tasks, setTasks] = useState([]);
  const [editedTask, setEditedTask] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const formatDate = (dateString) => {
    const options = { day: 'numeric', month: 'numeric', year: 'numeric' };
    const formattedDate = new Date(dateString).toLocaleDateString(undefined, options);
    return formattedDate;
  };

  const handleEditTask = (task) => {
    setEditedTask(task);
    setIsEditing(true)
  };

  const handleCancelEdit = () => {
    setEditedTask(null);
  };


  const handleUpdateTask = async () => {
    try {
      console.log('Updating task...');
      
      await taskServices.updateTask(editedTask._id, {
        title: editedTask.title,
        description: editedTask.description,
        dueDate: editedTask.dueDate,
        status: editedTask.status,
      });
  
      console.log('Task updated successfully');
  
      // Close the edit modal or reset the editing state
      setIsEditing(false);
  
      // Optionally, you can fetch the updated tasks and set them
      const updatedTasks = await taskServices.getTasks();
      setTasks(updatedTasks.tasks || []);
  
      setSuccessMessage('Task updated successfully');
    } catch (error) {
      console.error('Error updating task:', error.message);
      setSuccessMessage('Failed to update task');
    }
  };
 
  const handleDeleteTask = async (taskId) => {
    try {
      await taskServices.deleteTask(taskId);

      // Update the task list after deletion
      const updatedTasks = await taskServices.getTasks();
      setTasks(updatedTasks.tasks || []);
      setSuccessMessage('Task deleted successfully');
    } catch (error) {
      console.error('Error deleting task:', error.message);
      setSuccessMessage('Failed to delete task');
    }
  };
 
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const fetchedTasks = await taskServices.getTasks();
        console.log('fetchedTasks', fetchedTasks);
        setTasks(fetchedTasks.tasks || []);
      } catch (error) {
        console.error('Error fetching tasks:', error.message);
        setTasks([]); // Set an empty array in case of an error
      }
    };
    fetchTasks();
  }, [todos]);
  return (
    <div>
    {successMessage &&  <p>{successMessage}</p>}
    {Array.isArray(tasks) ? (
      tasks.map((task) => (
        <div key={task._id} className="border p-4 my-2 rounded-md">
          {isEditing && editedTask ? (
              <div>
              <h3 className="text-xl font-bold mb-2">Editing Task: {task.title}</h3>
              <div className="mb-2">
                <label className="block text-sm font-medium text-gray-700">Title</label>
                <input
                  type="text"
                  value={editedTask.title}
                  onChange={(e) => setEditedTask({ ...editedTask, title: e.target.value })}
                  className="mt-1 block w-full border rounded-md shadow-sm focus:ring focus:border-blue-300 sm:text-sm"
                  required
                />
              </div>
              <div className="mb-2">
      <label className="block text-sm font-medium text-gray-700">Description</label>
      <input
        type="text"
        value={editedTask.description}
        onChange={(e) => setEditedTask({ ...editedTask, description: e.target.value })}
        className="mt-1 block w-full border rounded-md shadow-sm focus:ring focus:border-blue-300 sm:text-sm"
        required
      />
    </div>
    <div className="mb-2">
      <label className="block text-sm font-medium text-gray-700">Due Date</label>
      <input
        type="date"
        value={editedTask.dueDate}
        onChange={(e) => setEditedTask({ ...editedTask, dueDate: e.target.value })}
        className="mt-1 block w-full border rounded-md shadow-sm focus:ring focus:border-blue-300 sm:text-sm"
      />
    </div>
              <div className="mb-2">
                <label className="block text-sm font-medium text-gray-700">Status</label>
                <select
                  value={editedTask.status}
                  onChange={(e) => setEditedTask({ ...editedTask, status: e.target.value })}
                  className="mt-1 block w-full border rounded-md shadow-sm focus:ring focus:border-blue-300 sm:text-sm"
                >
                  <option value="Not Started">Not Started</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Completed">Completed</option>
                </select>
              </div>
              <div className="flex">
                <button
                  onClick={handleUpdateTask}
                  className="bg-blue-500 text-white px-4 py-2 rounded-md mr-2"
                >
                  Update
                </button>
                <button
                  onClick={handleCancelEdit}
                  className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md"
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <div className="flex justify-evenly items-center">
            <div>
            <h3 className="text-xl font-bold">Title: {task.title}</h3>
              <p className="text-gray-600">Description: {task.description}</p>
              <p className="text-blue-500">Status: {task.status}</p>
              <p className="text-gray-500">Due Date: {formatDate(task.dueDate)}</p>
            </div>
              <div className="flex mt-2">
                <FaEdit  
                className="text-3xl mr-3"
                onClick={() => handleEditTask(task)}/>
               <RiDeleteBinLine
              className="text-3xl mr-3"
                onClick={() => handleDeleteTask(task._id)}/>
                
              </div>
            </div>
          )}
        </div>
      ))
    ) : (
      <p>No tasks available</p>
    )}
  </div>
  );
};

export default TaskList;
