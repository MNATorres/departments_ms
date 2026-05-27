import { departmentsRepo } from "../repository/departments.repository.js";
import type { Department } from "../types/entities.type.js";
import { publishEvent } from "../config/queue.js";

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

const createDepartment = async (deptNo: string, deptName: string) => {
  // 1. Guardamos el nuevo departamento en la base de datos de departamentos
  const result = await departmentsRepo.create({
    dept_no: deptNo,
    dept_name: deptName,
  });

  // 2. ─── EL GRITO DE PUB/SUB ───
  // Si la DB guardó todo bien, le avisamos al broker enviando el ID y el Nombre
  publishEvent("DEPARTMENT_CREATED", {
    dept_no: deptNo,
    dept_name: deptName,
  });

  return {
    message: "Departamento creado con éxito y evento notificado.",
    data: result,
  };
};

export { getAllDepartments, findByNumber, createDepartment };
