const SwaggerUi = require('swagger-ui-express');
const { generateSwagger } = require('@albatross/dynamic-swagger');

module.exports = ({ config, antiFraudRoutes }) => {
    const routes = [].concat(antiFraudRoutes);

    const options = {
        title: config.info.serviceLabel,
        version: config.info.version,
        description: 'Swagger for Kurly Klaw Backend Project'
    };

    const swaggerDoc = generateSwagger(routes, options);

    return [SwaggerUi.serve, SwaggerUi.setup(swaggerDoc)];
};
