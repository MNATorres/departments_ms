import { employeesRepo } from "../respository/employees.repository.js";
import type { Employee } from "../types/entities.type.js";

interface ServiceResponse {
  message: string;
  data: Employee[];
}

const getAllEmployees = async (): Promise<ServiceResponse> => {
  const result = await employeesRepo.findAll();

  return {
    message: "Respuesta generada desde el servicio de empleados",
    data: result,
  };
};

const findByGender = async (gender: "M" | "F"): Promise<ServiceResponse> => {
  const result = await employeesRepo.findByGender(gender);

  return {
    message: `Response for ${gender} from employes.service`,
    data: result,
  };
};

export { getAllEmployees, findByGender };
