import type { Request, Response } from "express";
import * as departmentsService from "../services/departments.service.js";

export const getAllDepartments = async (
  _req: Request,
  res: Response,
) => {
  const result = await departmentsService.getAllDepartments();
  res.status(200).json(result);
};

export const findByNumber = async (req: Request, res: Response): Promise<void> => {
  const { number } = req.body;

  const result = await departmentsService.findByNumber(number);
  res.status(200).json(result);
};
