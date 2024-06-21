import swaggerJSDoc from 'swagger-jsdoc';

const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'SiLoUso API',
      version: '1.0.0',
      description: 'API para gestionar productos en SiLoUso',
      contact: {
        name: 'Tu Nombre',
        email: 'tu@email.com',
      },
    },
    servers: [
      {
        url: 'http://localhost:5173', // URL de tu servidor local
        description: 'Servidor Local',
      },
      {
        url: 'https://no-lo-uso-ecommerce.vercel.app', // URL de tu servidor de producción
        description: 'Servidor de Producción',
      },
    ],
  },
  apis: ['./product/routes/productsRouter.js'], // Ruta de tus rutas API
};

const swaggerSpec = swaggerJSDoc(swaggerOptions);

export default swaggerSpec;
