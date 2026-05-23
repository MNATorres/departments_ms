import { Router } from "express";
import { getAllEmployeesController, findByGender } from "../controllers/employees.controller.js";

export const employeesRouter = Router();

employeesRouter.get("/", getAllEmployeesController);
employeesRouter.post("/by-gender", findByGender);
