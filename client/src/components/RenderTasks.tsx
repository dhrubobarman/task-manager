import { FaPen } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { Task } from "../types";

const RenderTasks = ({ taskList }: { taskList: Task[] }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
      {taskList.map((task) => (
        <div
          key={task._id}
          className="shadow-sm p-3 border rounded flex justify-between"
        >
          <div>
            <h3 className="text-xl font-semibold mb-2">{task.title}</h3>
            <p className="text-md">{task.description} </p>
          </div>
          <div>
            <button type="button" className="btn btn-sm btn-circle mr-2 mb-2">
              <span className="sr-only">edit</span>
              <FaPen />
            </button>
            <button type="button" className="btn btn-sm btn-circle mb-2">
              <span className="sr-only">delete</span>
              <MdDelete />
            </button>
            <p className="text-[10px] ml-auto text-right">
              {new Date(task.updatedAt || "").toLocaleDateString()}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default RenderTasks;
