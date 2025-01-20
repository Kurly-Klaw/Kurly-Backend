const { Router } = require('express');
const { check } = require('../middlewares/checkUserMiddleware')

module.exports = ({ validatorMiddleware }) => ({
    register: (routes) => {
        const router = Router();

        routes.forEach(route => {
            const { method, path, validation } = route;

            const middlewares = [
                validatorMiddleware.validateContract(validation)
            ];

            if(path === '/users/signup'){
                middlewares.push(check)
            }

            router[method](path, ...middlewares, customHandler);
        });

        return router;
    }
});