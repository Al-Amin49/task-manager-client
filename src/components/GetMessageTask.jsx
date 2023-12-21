const GetMessageTask = ({ tasks }) => {
  //completed tasks
  const totalCompletedTasks = tasks.filter(
    (task) => task.completed === true
  ).length;
  //total task
  const totalTask = tasks.length;

  const getMessage = () => {
    const percentage =
      totalTask === 0
        ? "Your daily deeds start here."
        : (totalCompletedTasks / totalTask) * 100;
    if (totalCompletedTasks === 0 && totalTask === 0) {
      return "";
    }
    if (percentage === 0) {
      return "Try to do at least one 🤲";
    }
    if (percentage === 100) {
      return "Nice Job for today 👏";
    }
    return "Keep it going 💪🏻";
  };
  getMessage();
  return (
    <>
      <div className="text-center my-4">
        <h1 className="text-3xl">
          {totalCompletedTasks}/{totalTask} complete
        </h1>
        <p className="text-2xl text-gray-600">{getMessage()}</p>
      </div>
    </>
  );
};

export default GetMessageTask;
