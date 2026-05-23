import { Router } from "express";
import { healthRouter } from "./health.router.js";
import { employeesRouter } from "./employees.router.js";

export const apiRouter = Router();

apiRouter.use("/health", healthRouter);
apiRouter.use("/employees", employeesRouter);
