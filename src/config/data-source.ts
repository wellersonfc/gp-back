// src/config/data-source.ts
import { DataSource } from "typeorm";
import { Tarefa } from "../entities/Tarefa";
import { Projeto } from "../entities/Projeto";
import dotenv from "dotenv";

dotenv.config(); // Carregar variáveis de ambiente

export const AppDataSource = new DataSource({
  type: 'mysql', 
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT), 
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [Projeto, Tarefa], // Importar o modelo Cliente
  synchronize: false,   // Sincronizar as entidades com o banco (em desenvolvimento)
  logging: true,
});
