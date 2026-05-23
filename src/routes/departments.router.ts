import { Router } from "express";
import { getAllDepartments, findByNumber } from "../controllers/departments.controller.js";

export const departmentsRouter = Router();

departmentsRouter.get("/", getAllDepartments);
departmentsRouter.post("/by-number", findByNumber);
