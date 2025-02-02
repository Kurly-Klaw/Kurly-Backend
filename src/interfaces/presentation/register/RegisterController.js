const AsyncMiddleware = require('../../middlewares/AsyncMiddleware');

module.exports = () => ({

    retrieveRegisterById: AsyncMiddleware(async (ctx) => {
        const { retrieveRegisterByIdOperation, httpConstants } = ctx.container.cradle;

        const { register_id } = ctx.params;

        const registerFound = await retrieveRegisterByIdOperation.execute(register_id);

        return ctx.res.status(httpConstants.OK).json(registerFound);
    }),

    createRegister: AsyncMiddleware(async (ctx) => {
        const { createRegisterOperation, httpConstants } = ctx.container.cradle;

        const { body: transactionData } = ctx;
        const { user_id } = ctx.headers;

        const createdRegister = await createRegisterOperation.execute(transactionData, user_id);

        return ctx.res.status(httpConstants.CREATED).json(createdRegister);
    }),

    retrieveRegister: AsyncMiddleware(async (ctx) => {
        const { retrieveRegisterOperation, httpConstants } = ctx.container.cradle;

        const registersRetrieved = await retrieveRegisterOperation.execute(ctx.query);

        return ctx.res.status(httpConstants.OK).json(registersRetrieved);
    }),

    updateRegister: AsyncMiddleware(async (ctx) => {
        const { updateRegisterOperation, httpConstants } = ctx.container.cradle;
        const { register_id } = ctx.params;
        const { body: transactionData } = ctx;

        const registerRetrieved = await updateRegisterOperation.execute(transactionData, register_id);

        return ctx.res.status(httpConstants.OK).json(registerRetrieved);
    }),

    updateRegisterStatus: AsyncMiddleware(async (ctx) => {
        const { updateRegisterStatusOperation, httpConstants } = ctx.container.cradle;
        const { register_id } = ctx.params;
        const { body: transactionData } = ctx;

        const registerRetrieved = await updateRegisterStatusOperation.execute(transactionData, register_id);

        return ctx.res.status(httpConstants.OK).json(registerRetrieved);
    }),

    deleteRegister: AsyncMiddleware(async (ctx) => {
        const { deleteRegisterOperation, httpConstants } = ctx.container.cradle;
        const { register_id } = ctx.params;

        await deleteRegisterOperation.execute(register_id);

        return ctx.res.status(httpConstants.OK).json({});
    })
});
