import { useEffect } from "react";
import { useState } from "react";
import taskServices from "../../services/TaskServices";

const TaskList = () => {
    const [tasks, setTasks]= useState([]);
    const formatDate = (dateString) => {
      const options = { day: 'numeric', month: 'numeric', year: 'numeric' };
      const formattedDate = new Date(dateString).toLocaleDateString(undefined, options);
      return formattedDate;
    };
    useEffect(()=>{
        const fetchTasks = async () => {
            try {
              const fetchedTasks = await taskServices.getTasks();
              console.log('fetchedTasks',fetchedTasks)
              setTasks(fetchedTasks.tasks || []);
            } catch (error) {
              console.error('Error fetching tasks:', error.message);
              setTasks([]); // Set an empty array in case of an error
            }
          };
          fetchTasks()
    },[])
    return (
        <div>
            {Array.isArray(tasks) ? (
        tasks.map((task) => <li key={task._id}>
          <div>
         <h3>Title: {task.title}</h3> 
         <p>Description: {task.description}</p>
         <p>status: {task.status}</p>
         <p>dueData:{formatDate(task.dueDate)}</p>
          </div>
        </li>)
      ) : (
        <p>No tasks available</p>
      )}
        </div>
    );
};

export default TaskList;