const AsyncMiddleware = require('../../middlewares/AsyncMiddleware');

module.exports = () => ({

    userLogin: AsyncMiddleware(async (ctx) => {
        const { loginUserOperation, httpConstants } = ctx.container.cradle;
        /*
        const { transaction_id } = ctx.params;
        const { 'x-user-id': userId } = ctx.headers;
        */
        const { body: transactionData } = ctx;

        const loginUser = await loginUserOperation.execute(transactionData);

        return ctx.res.status(httpConstants.OK).json(loginUser);
    }),

    userSingup: AsyncMiddleware(async (ctx) => {
        const { createUserOperation, httpConstants } = ctx.container.cradle;

        const { body: transactionData } = ctx;

        const userSingup = await createUserOperation.execute(transactionData, ctx.res);

        return ctx.res.status(httpConstants.CREATED).json(userSingup);
    }),

    retrieveUser: AsyncMiddleware(async (ctx) => {
        const { retrieveUserOperation, httpConstants } = ctx.container.cradle;
        const { query } = ctx.query;

        const userRetrieved = await retrieveUserOperation.execute(query);

        return ctx.res.status(httpConstants.OK).json(userRetrieved);
    }),

    updateUser: AsyncMiddleware(async (ctx) => {
        const { updateUserOperation, httpConstants } = ctx.container.cradle;
        const { email } = ctx.headers;
        const { body: transactionData } = ctx;

        const userRetrieved = await updateUserOperation.execute(transactionData,email);

        return ctx.res.status(httpConstants.OK).json(userRetrieved);
    }),

    deleteUser: AsyncMiddleware(async (ctx) => {
        const { deleteUserOperation, httpConstants } = ctx.container.cradle;
        const { email } = ctx.headers;

        await deleteUserOperation.execute(email);

        return ctx.res.status(httpConstants.OK).json({});
    })
});
