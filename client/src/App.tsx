import { useCallback, useEffect, useState } from "react";
import CreateTask from "./components/CreateTask";
import { Task } from "./types";
import { useAxios } from "./lib";
import Skeleton from "./components/Skeleton";
import RenderTasks from "./components/RenderTasks";

function App() {
  const [taskList, setTaskList] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const axiosInstance = useAxios(setIsLoading);

  const fetchTaskList = useCallback(async () => {
    try {
      setIsLoading(true);
      const {
        data: { data },
      } = await axiosInstance.get("/tasks");
      setTaskList(data);
    } catch (error) {}
  }, []);

  useEffect(() => {
    fetchTaskList();
  }, [fetchTaskList]);
  return (
    <div className="container my-4">
      <CreateTask setTaskList={setTaskList} allTasks={taskList} />
      <div className="mb-4" />
      {isLoading ? <Skeleton /> : <RenderTasks taskList={taskList} />}
    </div>
  );
}

export default App;
