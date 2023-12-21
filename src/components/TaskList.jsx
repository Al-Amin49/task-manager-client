import { useEffect } from "react";
import { useState } from "react";
import taskServices from "../services/TaskServices";
import { FaEdit } from "react-icons/fa";
import { RiDeleteBinLine } from "react-icons/ri";
import toast from "react-hot-toast";
import Loading from "../components/Loading";
import GetMessageTask from "./GetMessageTask";
const TaskList = ({ todos }) => {
  const [tasks, setTasks] = useState([]);
  const [editedTask, setEditedTask] = useState(null);
  const [isEditing, setIsEditing] = useState({});
  const [loading, setLoading] = useState(true);

  //formatted data dd/mm/year
  const formatDate = (dateString) => {
    const options = { day: "numeric", month: "numeric", year: "numeric" };
    const formattedDate = new Date(dateString).toLocaleDateString(
      undefined,
      options
    );
    return formattedDate;
  };

  const handleEditTask = (task) => {
    setEditedTask(task);
    setIsEditing((prevEditing) => ({
      ...prevEditing,
      [task._id]: true,
    }));
  };
  // reset isEditing for all tasks
  const handleCancelEdit = () => {
    setEditedTask(null);
    setIsEditing({});
  };

  const handleUpdateTask = async () => {
    try {
      await taskServices.updateTask(editedTask._id, {
        title: editedTask.title,
        description: editedTask.description,
        dueDate: editedTask.dueDate,
        status: editedTask.status,
        completed: editedTask.status === "Completed",
      });
      // reset isediting for all task
      setIsEditing({});

      // fetch the updated tasks
      const updatedTasks = await taskServices.getTasks();
      setTasks(updatedTasks.tasks || []);

      toast.success("Task Updated Successfully");
    } catch (error) {
      console.error("Error updating task:", error.message);
      toast.error("Failed to update task");
    }
  };

  const handleDeleteTask = async (taskId) => {
    try {
      if (window.confirm("Are you sure to delete")) {
        await taskServices.deleteTask(taskId);

        // Update the task list after deletion
        const updatedTasks = await taskServices.getTasks();
        setTasks(updatedTasks.tasks);
        toast.success("Task deleted successfully");
      }
    } catch (error) {
      console.error("Error deleting task:", error.message);
      toast.error("Failed to delete task");
    }
  };

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        setLoading(true);
        const fetchedTasks = await taskServices.getTasks();
        setTasks(fetchedTasks.tasks);
      } catch (error) {
        console.error("Error fetching tasks:", error.message);
        setTasks([]);
      } finally {
        setLoading(false);
      }
    };
    fetchTasks();
  }, [todos]);
  return (
    <div>
      {loading ? <Loading /> : <GetMessageTask tasks={tasks}></GetMessageTask>}
      
      {Array.isArray(tasks) && tasks.length > 0 ? (
        tasks.map((task) => (
          <div key={task._id} className="border p-4 my-2 rounded-md">
            {isEditing[task._id] && editedTask ? (
              <div>
                <h3 className="text-xl font-bold mb-2">
                  Editing Task: {task.title}
                </h3>
                <div className="mb-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Title
                  </label>
                  <input
                    type="text"
                    value={editedTask.title}
                    onChange={(e) =>
                      setEditedTask({ ...editedTask, title: e.target.value })
                    }
                    className="mt-1 block w-full border rounded-md shadow-sm focus:ring focus:border-blue-300 sm:text-sm"
                    required
                  />
                </div>
                <div className="mb-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Description
                  </label>
                  <textarea
                    type="text"
                    value={editedTask.description}
                    onChange={(e) =>
                      setEditedTask({
                        ...editedTask,
                        description: e.target.value,
                      })
                    }
                    className="mt-1 block w-full border rounded-md shadow-sm focus:ring focus:border-blue-300 sm:text-sm"
                    required
                  />
                </div>
                <div className="mb-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Due Date
                  </label>
                  <input
                    type="date"
                    value={editedTask.dueDate}
                    onChange={(e) =>
                      setEditedTask({ ...editedTask, dueDate: e.target.value })
                    }
                    className="mt-1 block w-full border rounded-md shadow-sm focus:ring focus:border-blue-300 sm:text-sm"
                  />
                </div>
                <div className="mb-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Status
                  </label>
                  <select
                    value={editedTask.status}
                    onChange={(e) =>
                      setEditedTask({ ...editedTask, status: e.target.value })
                    }
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
                  <p className="text-gray-600">
                    Description: {task.description}
                  </p>
                  <p className="text-blue-500">Status: {task.status}</p>
                  <p className="text-gray-500">
                    Due Date: {formatDate(task.dueDate)}
                  </p>
                  <p className="text-green-500">
                    Completed: {task.completed ? "Yes" : "No"}
                  </p>
                </div>
                <div className="flex mt-2">
                  <FaEdit
                    className="text-3xl mr-3"
                    onClick={() => handleEditTask(task)}
                  />
                  <RiDeleteBinLine
                    className="text-3xl mr-3"
                    onClick={() => handleDeleteTask(task._id)}
                  />
                </div>
              </div>
            )}
          </div>
        ))
      ) : (
        <p className="text-xl ">No tasks available. Enjoy your free time! 😊</p>
      )}
    </div>
  );
};

export default TaskList;
