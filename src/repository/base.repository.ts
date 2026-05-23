import type { Pool, RowDataPacket } from "mysql2/promise";

export abstract class BaseRepository<T> {
  constructor(
    protected readonly pool: Pool,
    protected readonly tableName: string,
  ) {}

  async findAll(): Promise<T[]> {
    const [rows] = await this.pool.query<(T & RowDataPacket)[]>(
      `SELECT * FROM ${this.tableName}`,
    );
    return rows;
  }

  async findById(
    idColumn: string,
    idValue: string | number,
  ): Promise<T | null> {
    const [rows] = await this.pool.query<
      Record<string, any>[] & RowDataPacket[]
    >(`SELECT * FROM ${this.tableName} WHERE ${idColumn} = ?`, [idValue]);

    const result = rows[0];
    if (!result) return null;

    return result as T;
  }
}
