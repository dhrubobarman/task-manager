import { useCallback, useEffect, useState } from "react";
import CreateTask from "./components/CreateTask";
import { Task } from "./types";
import { axiosInstance } from "./lib";
import { useToast } from "./components/use-toast";
import Skeleton from "./components/Skeleton";
import RenderTasks from "./components/RenderTasks";

function App() {
  const { toast } = useToast();
  const [taskList, setTaskList] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchTaskList = useCallback(async () => {
    try {
      const {
        data: { data },
      } = await axiosInstance.get("/tasks");
      setTaskList(data);
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Something Went Wrong",
        description: JSON.stringify(error?.response?.data.error),
      });
    }
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
