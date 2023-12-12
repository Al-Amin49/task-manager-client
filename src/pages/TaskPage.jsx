import TaskForm from "../assets/components/TaskForm";


const TaskPage = () => {
    return (
        <div className="max-w-sm mx-auto">
            <h3 className="my-10 text-center">Task To do</h3>
           <TaskForm/>
        </div>
    );
};

export default TaskPage;