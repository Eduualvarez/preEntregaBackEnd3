import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);



export const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Mi API de prueba',
      version: '1.0.0',
      description: 'Documentación generada por Swagger',
    },
    servers: [
      {
        url: 'http://localhost:8080',
      }, 
    ],
  },
  apis: [path.resolve(__dirname, '../routes/*.js')], 
};