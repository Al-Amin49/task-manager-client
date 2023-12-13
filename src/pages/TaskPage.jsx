import { useState } from "react";
import TaskForm from "../assets/components/TaskForm";
import TaskList from "../assets/components/TaskList";


const TaskPage = () => {
 
    const [todos, setTodos] = useState([]);

    const handleAddTask = (newTask) => {
      setTodos((prevTasks) => [...prevTasks, newTask]);
    };
    return (
        <div className="max-w-sm mx-auto my-2">
          
           <TaskForm onAddTask={handleAddTask}/>
           <TaskList todos={todos} />
        </div>
    );
};

export default TaskPage;