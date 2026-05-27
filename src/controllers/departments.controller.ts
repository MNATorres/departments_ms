import type { Request, Response } from "express";
import * as departmentsService from "../services/departments.service.js";

export const getAllDepartments = async (_req: Request, res: Response) => {
  const result = await departmentsService.getAllDepartments();
  res.status(200).json(result);
};

export const findByNumber = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const { number } = req.body;

  const result = await departmentsService.findByNumber(number);
  res.status(200).json(result);
};

export const createDepartment = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const { dept_no, dept_name } = req.body;

  if (!dept_no || !dept_name) {
    res.status(400).json({ message: "dept_no and dept_name are required" });
    return;
  }

  const result = await departmentsService.createDepartment(dept_no, dept_name);

  res.status(201).json(result);
};
