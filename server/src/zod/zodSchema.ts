import { z } from "zod";
import mongoose from "mongoose";

export const zodMongoId = z.string().refine((val) => {
  return mongoose.Types.ObjectId.isValid(val);
}, "Invalid Task ID");

export const zodTaskBody = z.object({
  title: z
    .string()
    .trim()
    .min(5, "Title has to be at least 5 characters long")
    .max(20, "Title has to be at most 20 characters long"),
  description: z.string().trim().min(1, "Description has to be at least 5 characters long"),
  completed: z.boolean().optional(),
});
