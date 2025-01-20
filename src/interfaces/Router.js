const { Router } = require('express');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');

module.exports = ({
    config,
    routerRegister,
    loggerMiddleware,
    httpErrorMiddleware,
    userRoutes,
    swaggerMiddleware
}) => {
    const apiRouter = Router();

    if (config.env !== 'test')
        apiRouter.use(loggerMiddleware);

    apiRouter
        .use(methodOverride('X-HTTP-Method-Override'))
        .use(cors())
        .use(bodyParser.json())
        .use(urlencoded({ extended: true }))
        .use(cookieParser())
        .use('/api/docs', swaggerMiddleware)
        .use('/api', routerRegister.register(userRoutes))
        .use(httpErrorMiddleware);

    return apiRouter;
};
