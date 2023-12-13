import { useEffect, useState } from "react";
import TaskForm from "../assets/components/TaskForm";
import TaskList from "../assets/components/TaskList";


const TaskPage = () => {
    // const [checkData, setCheck]=useState([])
    // useEffect(()=>{
    //     fetch('http://localhost:8000/api/v1/tasks/')
    //     .then(res=>res.json())
    //     .then(data=>console.log('datallll', data))
    // },[])
    const [tasks, setTasks] = useState([]);

    const handleAddTask = (newTask) => {
      setTasks((prevTasks) => [...prevTasks, newTask]);
    };
    return (
        <div className="max-w-sm mx-auto">
            <h3 className="my-10 text-center">Task To do</h3>
           <TaskForm onAddTask={handleAddTask}/>
           <TaskList />
        </div>
    );
};

export default TaskPage;