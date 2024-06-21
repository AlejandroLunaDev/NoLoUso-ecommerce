import swaggerJSDoc from 'swagger-jsdoc';

const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'SiLoUso API',
      version: '1.0.0',
      description: 'Descripción de tu API',
    },
  },
  apis: ['./product/routes/productsRouter.js'], 
};

const swaggerSpec = swaggerJSDoc(swaggerOptions);

export default swaggerSpec;
