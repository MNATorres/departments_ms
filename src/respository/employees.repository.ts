import { dbPool } from "../config/database.js";
import { BaseRepository } from "./base.repository.js";
import type { Employee } from "../types/entities.type.js";

class EmployesRepository extends BaseRepository<Employee> {
  constructor() {
    super(dbPool, "employees");
  }

  async findByGender(gender: "M" | "F"): Promise<Employee[]> {
    const [rows] = await this.pool.query<any[]>(
      `SELECT * FROM ${this.tableName} WHERE gender = ?`,
      [gender],
    );

    return rows as Employee[];
  }
}

export const employeesRepo = new EmployesRepository();
