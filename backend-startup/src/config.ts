
import { DataSource } from 'typeorm';

export const AppDataSource = new DataSource({
  type: 'postgres',                          
  host: process.env.DB_HOST || 'localhost',
  port: Number(process.env.DB_PORT) || 5432, 
  username: process.env.DB_USER || 'fluxa_app_user',
  password: process.env.DB_PASS || 'senhasegurapracaralho',
  database: process.env.DB_NAME || 'FluxaDB',
  ssl: process.env.DB_SSL === 'true'
    ? { rejectUnauthorized: false }
    : false,
  entities: [...],  
  migrations: [...],
  synchronize: false,
});
