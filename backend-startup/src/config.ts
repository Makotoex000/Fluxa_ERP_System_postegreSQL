import dotenv from 'dotenv';
dotenv.config();

// Exporta JWT_SECRET para os middlewares e controllers
export const JWT_SECRET = process.env.JWT_SECRET || 'fluxa_erp_secret_2026';