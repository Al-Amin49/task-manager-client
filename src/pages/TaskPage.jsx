import TaskForm from "../assets/components/TaskForm";
import TaskList from "../assets/components/TaskList";


const TaskPage = () => {
    return (
        <div className="max-w-sm mx-auto">
            <h3 className="my-10 text-center">Task To do</h3>
           <TaskForm/>
           <TaskList/>
        </div>
    );
};

export default TaskPage;