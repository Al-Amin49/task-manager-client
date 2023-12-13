import { useEffect, useState } from "react";
import TaskForm from "../assets/components/TaskForm";
import TaskList from "../assets/components/TaskList";


const TaskPage = () => {
 
    const [tasks, setTasks] = useState([]);

    const handleAddTask = (newTask) => {
      setTasks((prevTasks) => [...prevTasks, newTask]);
    };
    return (
        <div className="max-w-sm mx-auto my-2">
          
           <TaskForm onAddTask={handleAddTask}/>
           <TaskList />
        </div>
    );
};

export default TaskPage;