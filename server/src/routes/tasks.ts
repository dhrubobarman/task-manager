import { Router } from "express";
import {
  getAllTasks,
  createTask,
  updateTask,
  getTask,
  deleteTask,
  deleteMultipleTask,
} from "@/controller/tasks";

const router = Router();

router.route("/").get(getAllTasks).post(createTask);
router.route("/:id").get(getTask).patch(updateTask).delete(deleteTask);
router.route("/delete").post(deleteMultipleTask);

export default router;
