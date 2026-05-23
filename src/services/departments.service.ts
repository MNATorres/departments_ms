import { departmentsRepo } from "../repository/departments.repository.js";
import type { Department } from "../types/entities.type.js";

interface ServiceResponse {
  message: string;
  data: Department[];
}

const getAllDepartments = async (): Promise<ServiceResponse> => {
  const result = await departmentsRepo.findAll();

  return {
    message: "Respuesta generada desde el servicio de departamentos",
    data: result,
  };
};

const findByNumber = async (number: string): Promise<ServiceResponse> => {
  const result = await departmentsRepo.findByNumber(number);

  return {
    message: `Response for ${number} from departments.service`,
    data: result,
  };
};

export { getAllDepartments, findByNumber };
