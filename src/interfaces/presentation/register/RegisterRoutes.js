module.exports = ({ container }) => {
    const { registerController, registerSchema } = container.cradle;

    return [
        {
            method: 'post',
            path: '/register',
            middlewares: [],
            tags: ['register'],
            validation: {
                body: registerSchema.createRegisterBodySchema.body,
                headers: registerSchema.createRegisterHeadersSchema.headers
            },
            handler: registerController.createRegister
        },
        {
            method: 'put',
            path: '/register/:register_id',
            tags: ['register'],
            validation: {
                body: registerSchema.updateRegisterBodySchema.body,
                headers: registerSchema.headersAutorizationToken.headers,
                params: registerSchema.updateRegisterParamsSchema.params
            },
            handler: registerController.updateRegister
        },

        {
            method: 'put',
            path: '/register/:register_id/status',
            tags: ['register'],
            validation: {
                body: registerSchema.updateStatusBodySchema.body,
                headers: registerSchema.headersAutorizationToken.headers,
                params: registerSchema.updateRegisterStatusParamsSchema.params
            },
            handler: registerController.updateRegisterStatus
        },

        {
            method: 'delete',
            path: '/register/:register_id',
            tags: ['register'],
            validation: {
                headers: registerSchema.headersAutorizationToken.headers,
                params: registerSchema.deleteRegisterParamsSchema.params
            },
            handler: registerController.deleteRegister
        },

        {
            method: 'get',
            path: '/register/:register_id',
            tags: ['register'],
            validation: {
                headers: registerSchema.headersAutorizationToken.headers,
                params: registerSchema.getRegisterByIdParamsSchema.params
            },
            handler: registerController.retrieveRegisterById
        },
        {
            method: 'get',
            path: '/register',
            tags: ['register'],
            validation: {
                headers: registerSchema.headersAutorizationToken.headers,
                query: registerSchema.getRegisterQuerySchema.query
            },
            handler: registerController.retrieveRegister
        }
    ];
};
