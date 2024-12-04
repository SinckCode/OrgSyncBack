const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Documentación de proyecto final web',
    version: '1.0.0',
    description: 'Documentación de nuestro proyecto final de web',
  },
  servers: [
    {
      url: 'http://localhost:3000',
      description: 'Servidor de Desarrollo',
    },
  ],
  tags: [
    {
      name: 'Employees',
      description: 'Endpoints relacionados con empleados',
    },
    {
      name: 'Departments',
      description: 'Endpoints relacionados con departamentos',
    },
    {
      name: 'Managers',
      description: 'Endpoints relacionados con managers',
    },
    {
      name: 'Areas',
      description: 'Endpoints relacionados con áreas',
    },
  ],
};

const options = {
  swaggerDefinition,
  apis: ['./routes/*.js'],
};

const swaggerSpec = swaggerJsDoc(options);

function setupSwagger(app) {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
}

module.exports = setupSwagger;
