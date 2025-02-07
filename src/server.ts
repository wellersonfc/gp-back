import express from "express";
import { createConnection } from "typeorm";
import routes from "./routes";
import { setupSwagger } from "./config/swagger";
import dotenv from "dotenv";
import "reflect-metadata";
import { AppDataSource } from './config/data-source';
const cors = require('cors'); 

dotenv.config();


const app = express();
const PORT = process.env.PORT || 3001;
app.use(cors());

app.use(express.json());
app.use("/api", routes);
setupSwagger(app);

createConnection().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}).catch(error => console.log("Database connection error:", error));

AppDataSource.initialize()
  .then(() => {
    console.log('DataSource inicializado com sucesso!');
    
    const app = express();
    app.use(express.json());
    app.listen(3000, () => {
      console.log('Servidor rodando na porta 3000');
    });
  })
  .catch((error) => {
    console.error('Erro ao inicializar o DataSource', error);
  });
