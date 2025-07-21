import dotenv from "dotenv";
dotenv.config();

export const BOT_TOKEN = process.env.BOT_TOKEN as string;
export const ADMIN_ID = process.env.ADMIN as string;
export const USERS_TABLE = process.env.USERS_TABLE as string;
