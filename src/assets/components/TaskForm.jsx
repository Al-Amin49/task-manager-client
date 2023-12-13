import { useState } from "react";
import taskServices from "../../services/TaskServices";
import toast from "react-hot-toast";
import Loading from "./Loading";



const TaskForm = ({onAddTask}) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [status, setStatus] = useState('Not Started');
  // const [loading, setLoading]= useState(true)
  const handleAddTask = async (e) => {
    e.preventDefault()

    if(!title || !description || !dueDate){
      toast.error('Please Fill all require fields');
      return;
    }

    try {
      const newTask = await taskServices.addTask({
        title,
        description,
        dueDate,
        status,
        completed: false,
      });
     
      onAddTask(newTask); 
      toast.success('Successfully created!');
      // Clear the form fields after successful submission
      setTitle('');
      setDescription('');
      setDueDate('');
      setStatus('Not Started');
    } catch (error) {
      console.error('Error adding task:', error.message);
    }
   
  };

    return (
      <div>
       {/* {loading ? <Loading/> : */}
        <div className="bg-green-200 p-4">
        <form onSubmit={handleAddTask} className="w-full max-w-lg">
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="grid-first-name"
              >
                Title
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                id="grid-first-name"
                type="text"
                placeholder="title"
                value={title}
                onChange={(e)=>setTitle(e.target.value)}
              />
            </div>
            <div className="w-full md:w-1/2 px-3">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="grid-last-name"
              >
                Description
              </label>
              <textarea
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="grid-last-name"
                placeholder="Enter task description..."
                value={description}
                onChange={(e)=>setDescription(e.target.value)}
              />
            </div>
          </div>

          <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="status"
            >
              Status
            </label>
            
       
        <select 
            className=" block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
            value={status}
          onChange={(e)=>setStatus(e.target.value)}
        >
          <option value="Not Started">Not Started</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>
     
          </div>
            <div className="w-full md:w-1/2 px-3">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="grid-last-name"
              >
                Due Date
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="grid-last-name"
                type="date"
                value={dueDate}
                onChange={(e)=>setDueDate(e.target.value)}
              />
            </div>
          </div>

          
          <div className="text-center">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-center text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
             
            >
              Add Task
            </button>
          </div>
        </form>
      </div>
       
       {/* } */}
      </div>
    );
  };
  
  export default TaskForm;
  