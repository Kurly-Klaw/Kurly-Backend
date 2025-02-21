const AsyncMiddleware = require('../../middlewares/AsyncMiddleware');

module.exports = () => ({

    createSchedule: AsyncMiddleware(async (ctx) => {
        const { createScheduleOperation, httpConstants } = ctx.container.cradle;

        const { body: transactionData } = ctx;
        const { authorization } = ctx.headers;

        const createdSchedules = await createScheduleOperation.execute(transactionData, authorization);

        return ctx.res.status(httpConstants.CREATED).json(createdSchedules);
    }),

    retrieveSchedule: AsyncMiddleware(async (ctx) => {
        const { retrieveScheduleOperation, httpConstants } = ctx.container.cradle;
        const query = ctx.query;
        const { authorization } = ctx.headers;

        const schedulesRetrieved = await retrieveScheduleOperation.execute(query, authorization);

        return ctx.res.status(httpConstants.OK).json(schedulesRetrieved);
    }),

    updateSchedule: AsyncMiddleware(async (ctx) => {
        const { updateScheduleOperation, httpConstants } = ctx.container.cradle;
        const query = ctx.query;
        const { body: transactionData } = ctx;
        const { authorization } = ctx.headers;

        const schedulesUpdated = await updateScheduleOperation.execute(transactionData, query, authorization);

        return ctx.res.status(httpConstants.OK).json(schedulesUpdated);
    }),

    deleteSchedule: AsyncMiddleware(async (ctx) => {
        const { deleteScheduleOperation, httpConstants } = ctx.container.cradle;
        const { date } = ctx.query;
        const { authorization } = ctx.headers;

        await deleteScheduleOperation.execute(date, authorization);

        return ctx.res.status(httpConstants.OK).json({});
    })
});
