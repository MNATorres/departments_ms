import mysql from "mysql2/promise";
import { ENV } from "./env.js";

const poolConfig: mysql.PoolOptions = {
  host: ENV.DB.HOST,
  port: ENV.DB.PORT,
  user: ENV.DB.USER,
  password: ENV.DB.PASSWORD,
  database: ENV.DB.NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
};

export const dbPool = mysql.createPool(poolConfig);

export async function testDatabaseConnection(): Promise<void> {
  try {
    const connection = await dbPool.getConnection();
    await connection.query("SELECT 1");
    connection.release();
  } catch (error) {
    throw new Error(
      `Database infrastructure connection failed: ${(error as Error).message}`,
    );
  }
}
