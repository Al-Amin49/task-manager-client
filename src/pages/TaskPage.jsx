import { useState } from "react";
import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";


const TaskPage = () => {
 
    const [todos, setTodos] = useState([]);

    const handleAddTask = (newTask) => {
      setTodos((prevTasks) => [...prevTasks, newTask]);
    };
    return (
        <div className="max-w-screen-lg  mx-auto ">
             <h3 className="text-center my-8 text-3xl text-green-500 font-medium"> Your Daily deed starts here 🌟</h3>
           <div className="flex flex-col items-baseline md:flex-row md:justify-between">
           <TaskForm onAddTask={handleAddTask}/>
           <TaskList todos={todos} />
           
           </div>
        </div>
    );
};

export default TaskPage;