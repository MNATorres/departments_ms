// src/config/env.ts
import { z } from "zod";

const envSchema = z.object({
  PORT: z.coerce.number().default(3000),
  DB_HOST: z.string().default("localhost"),
  DB_PORT: z.coerce.number().default(3306),
  DB_USER: z.string().default("root"),
  DB_PASSWORD: z.string().optional().default(""),
  DB_DATABASE: z.string().default("employees"),
});

const parsedEnv = envSchema.parse(process.env);

export const ENV = Object.freeze({
  PORT: parsedEnv.PORT,
  DB: {
    HOST: parsedEnv.DB_HOST,
    PORT: parsedEnv.DB_PORT,
    USER: parsedEnv.DB_USER,
    PASSWORD: parsedEnv.DB_PASSWORD,
    NAME: parsedEnv.DB_DATABASE,
  },
});
