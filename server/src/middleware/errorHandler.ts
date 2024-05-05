import { Request, Response, NextFunction } from "express";

const errorHandlerMiddleware = (err: unknown, req: Request, res: Response, next: NextFunction) => {
  return res.status(500).json({ error: "Something went wrong" });
};

export default errorHandlerMiddleware;
