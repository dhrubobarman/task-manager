import { useAxios } from "../lib/useAxios";
import { GoPlus } from "react-icons/go";
import { useState } from "react";
import { useToast } from "./use-toast";
import { Task } from "../types";
import { MdDelete } from "react-icons/md";

const initialValue = {
  title: "",
  description: "",
};

const CreateTask = ({
  setTaskList,
  allTasks,
}: {
  setTaskList: React.Dispatch<React.SetStateAction<Task[]>>;
  allTasks: Task[];
}) => {
  const { toast } = useToast();
  const [values, setValues] = useState(initialValue);
  const [loading, setLoading] = useState(false);
  const axiosInstance = useAxios(setLoading);

  const handleInput = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setValues((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const createTask = async () => {
    // setLoading(true);
    const {
      data: { data },
    } = (await axiosInstance.post("/tasks/", values)) as {
      data: { data: Task };
    };
    toast({
      title: "New task created",
    });
    setTaskList((prev) => [...prev, data]);
    setValues(initialValue);
  };

  const deleteAll = async () => {
    const idList = allTasks?.map((task) => task._id);
    // setLoading(true);
    const response = await axiosInstance.post(`/tasks/delete`, idList);
    toast({
      variant: "destructive",
      title: "Success",
      description: response.data.message,
    });
    setTaskList([]);
  };

  return (
    <div className="card bg-base-100 shadow-xl px-10 pb-5 pt-5">
      <h1>Task Manger</h1>

      <div className="pt-2">
        <label className="form-control">
          <div className="label">
            <span className="label-text">Title</span>
          </div>
          <input
            type="text"
            disabled={loading}
            name="title"
            onChange={handleInput}
            value={values.title}
            placeholder="Type task title here"
            className="input input-bordered"
          />
        </label>
        <label className="form-control">
          <div className="label">
            <span className="label-text">Task Description</span>
          </div>
          <textarea
            name="description"
            disabled={loading}
            className="textarea textarea-bordered h-24"
            placeholder="Task"
            onChange={handleInput}
            value={values.description}
          ></textarea>
        </label>
        <div className="flex justify-end gap-2">
          <button className="btn mt-2 " disabled={loading} onClick={deleteAll}>
            Delete All
            {loading ? (
              <span className="loading loading-spinner"></span>
            ) : (
              <MdDelete size={24} />
            )}
          </button>
          <button className="btn mt-2 " disabled={loading} onClick={createTask}>
            Create
            {loading ? (
              <span className="loading loading-spinner"></span>
            ) : (
              <GoPlus size={24} />
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateTask;
