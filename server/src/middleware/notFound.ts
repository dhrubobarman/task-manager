import { type NextFunction, type Request, type Response } from "express";

const notFound = (req: Request, res: Response, next: NextFunction) => {
  //   const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404).json({ error: "Route does not exist" });
  //   next(error);
};

export default notFound;
