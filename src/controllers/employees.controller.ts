import type { Request, Response } from "express";
import * as employeesService from "../services/employees.service.js";

export const getAllEmployeesController = async (
  _req: Request,
  res: Response,
) => {
  const result = await employeesService.getAllEmployees();
  res.status(200).json(result);
};

export const findByGender = async (req: Request, res: Response): Promise<void> => {
  const { gender } = req.body;

  if (gender !== "M" && gender !== "F") {
    res.status(400).json({ message: "Invalid gender. Must be 'M' or 'F'" });
    return;
  }

  const result = await employeesService.findByGender(gender);
  res.status(200).json(result);
};
