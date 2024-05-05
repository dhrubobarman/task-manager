import { Request, Response, NextFunction } from "express";
import { CustomAPIError } from "../errors";

const errorHandlerMiddleware = (err: unknown, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof CustomAPIError) {
    return res.status(err.statusCode).json({ error: err.message });
  }
  return res.status(500).json({ error: "Something went wrong, please try again" });
};

export default errorHandlerMiddleware;
