const SwaggerUi = require('swagger-ui-express');
const { generateSwagger } = require('../../infra/suppport/SwaggerDocGenerator')

module.exports = ({ userRoutes }) => {
    const routes = [].concat(userRoutes);

    const options = {
        title: 'Kurly Backend',
        version: 'v1',
        description: 'Swagger for Kurly Klaw Backend Project'
    };

    const swaggerDoc = generateSwagger(routes, options);

    return [SwaggerUi.serve, SwaggerUi.setup(swaggerDoc)];
};
