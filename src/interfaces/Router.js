const { Router } = require('express');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');


module.exports = ({
    routerRegister,
    httpErrorMiddleware,
    userRoutes,
    swaggerMiddleware
}) => {
    const apiRouter = Router();

    apiRouter
        .use(cors())
        .use(bodyParser.json())
        .use(cookieParser())
        .use('/api/docs', swaggerMiddleware)
        .use('/api', routerRegister.register(userRoutes))
        .use(httpErrorMiddleware);

    return apiRouter;
};
