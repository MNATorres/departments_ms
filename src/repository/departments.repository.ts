import { dbPool } from "../config/database.js";
import { BaseRepository } from "./base.repository.js";
import type { Department } from "../types/entities.type.js";

class DepartmentsRepository extends BaseRepository<Department> {
  constructor() {
    super(dbPool, "departments");
  }

  async findByNumber(deptNo: string): Promise<Department[]> {
    const [rows] = await this.pool.query<any[]>(
      `SELECT * FROM ${this.tableName} WHERE dept_no = ?`,
      [deptNo],
    );

    return rows as Department[];
  }
}

export const departmentsRepo = new DepartmentsRepository();
