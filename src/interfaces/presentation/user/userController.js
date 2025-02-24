const AsyncMiddleware = require('../../middlewares/AsyncMiddleware');

module.exports = () => ({

    userLogin: AsyncMiddleware(async (ctx) => {
        const { loginUserOperation, httpConstants } = ctx.container.cradle;
        /*
        const { transaction_id } = ctx.params;
        const { 'x-seller-id': sellerId } = ctx.headers;
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
        const { authorization } = ctx.headers;

        const userRetrieved = await retrieveUserOperation.execute(query, authorization);

        return ctx.res.status(httpConstants.OK).json(userRetrieved);
    }),

    
    retrieveUserById: AsyncMiddleware(async (ctx) => {
        const { retrieveUserByIdOperation, httpConstants } = ctx.container.cradle;
        const { user_id } = ctx.params;
        const { authorization } = ctx.headers;

        const userRetrieved = await retrieveUserByIdOperation.execute(user_id, authorization);

        return ctx.res.status(httpConstants.OK).json(userRetrieved);
    }),

    updateUser: AsyncMiddleware(async (ctx) => {
        const { updateUserOperation, httpConstants } = ctx.container.cradle;
        const { user_id } = ctx.headers;
        const { body: transactionData } = ctx;
        const { authorization } = ctx.headers;

        const userRetrieved = await updateUserOperation.execute(transactionData,user_id, authorization);

        return ctx.res.status(httpConstants.OK).json(userRetrieved);
    }),

    deleteUser: AsyncMiddleware(async (ctx) => {
        const { deleteUserOperation, httpConstants } = ctx.container.cradle;
        const { user_id } = ctx.headers;
        const { authorization } = ctx.headers;

        await deleteUserOperation.execute(user_id, authorization);

        return ctx.res.status(httpConstants.OK).json({});
    })
});
