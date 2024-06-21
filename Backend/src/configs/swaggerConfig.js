import swaggerJSDoc from 'swagger-jsdoc';

const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'Nombre de tu API',
      version: '1.0.0',
      description: 'Descripción de tu API',
    },
  },
  apis: ['./routes/*.js'], // Rutas donde se encuentran tus endpoints
};

const swaggerSpec = swaggerJSDoc(swaggerOptions);

export default swaggerSpec;
