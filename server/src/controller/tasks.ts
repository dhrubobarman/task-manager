import { Request, Response } from "express";
import Task from "@/models/Task";
import { z } from "zod";
import { zodMongoId, zodTaskBody } from "@/zod/zodSchema";
import asyncWrapper from "../middleware/async";

const getAllTasks = asyncWrapper(async (req: Request, res: Response) => {
  const tasks = await Task.find().sort().select("-__v");
  return res.status(200).json({ data: tasks });
});

const createTask = asyncWrapper(async (req: Request, res: Response) => {
  const parsed = zodTaskBody.parse(req.body);
  const task = await Task.create(parsed);
  return res.json({ data: task });
});

const getTask = asyncWrapper(async (req: Request, res: Response) => {
  const paramSchema = z.object({
    id: zodMongoId,
  });
  const parsed = paramSchema.parse(req.params);
  const { id } = parsed;
  const task = await Task.findById(id).select("-__v");
  if (!task) {
    return res.status(404).json({ error: `Task not found with id: ${id}` });
  }
  return res.status(400).json({ data: task });
});

const deleteTask = asyncWrapper(async (req: Request, res: Response) => {
  const paramSchema = z.object({
    id: zodMongoId,
  });
  const parsed = paramSchema.parse(req.params);
  const { id } = parsed;
  const task = await Task.findByIdAndDelete(id);
  if (!task) {
    return res.status(404).json({ error: `Task not found with id: ${id}` });
  }
  return res.status(200).json({ message: "Task deleted successfully" });
});

const deleteMultipleTask = asyncWrapper(async (req: Request, res: Response) => {
  const paramSchema = zodMongoId.array();
  const parsed = paramSchema.parse(req.body);
  const ids = parsed;
  const task = await Task.deleteMany({ _id: { $in: ids } });
  if (!task) {
    return res.status(404).json({ error: `Task not found with id` });
  }
  return res.status(200).json({ message: "All tasks deleted successfully" });
});

const updateTask = asyncWrapper(async (req: Request, res: Response) => {
  const parsedBody = zodTaskBody.partial().parse(req.body);
  const paramSchema = z.object({
    id: zodMongoId,
  });
  const parsedId = paramSchema.parse(req.params);
  const { id } = parsedId;
  const data = parsedBody || {};

  const dbTask = await Task.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  });

  if (!dbTask) {
    return res.status(404).json({ error: `Task not found with id: ${id}` });
  }

  return res.status(200).json({ data: dbTask });
});

export { getAllTasks, createTask, updateTask, getTask, deleteTask, deleteMultipleTask };
