


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
        url: 'https://localhost:8080',
      }, 
    ],
  },
  apis: ['./src/**/*.js'], // <--- ESTA DEBE COINCIDIR con la ubicación real del archivo con @swagger
};