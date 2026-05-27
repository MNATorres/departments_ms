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

  async create(dept: Department): Promise<void> {
    await this.pool.query(
      `INSERT INTO ${this.tableName} (dept_no, dept_name) VALUES (?, ?)`,
      [dept.dept_no, dept.dept_name],
    );
  }
}

export const departmentsRepo = new DepartmentsRepository();
