const AsyncMiddleware = require('../../middlewares/AsyncMiddleware');

module.exports = () => ({

    createSchedule: AsyncMiddleware(async (ctx) => {
        const { createScheduleOperation, httpConstants } = ctx.container.cradle;

        const { body: transactionData } = ctx;

        const createdSchedules = await createScheduleOperation.execute(transactionData);

        return ctx.res.status(httpConstants.CREATED).json(createdSchedules);
    }),

    retrieveSchedule: AsyncMiddleware(async (ctx) => {
        const { retrieveScheduleOperation, httpConstants } = ctx.container.cradle;
        const query = ctx.query;

        const schedulesRetrieved = await retrieveScheduleOperation.execute(query);

        return ctx.res.status(httpConstants.OK).json(schedulesRetrieved);
    }),

    updateSchedule: AsyncMiddleware(async (ctx) => {
        const { updateScheduleOperation, httpConstants } = ctx.container.cradle;
        const query = ctx.query;
        const { body: transactionData } = ctx;

        const schedulesUpdated = await updateScheduleOperation.execute(transactionData, query);

        return ctx.res.status(httpConstants.OK).json(schedulesUpdated);
    }),

    deleteSchedule: AsyncMiddleware(async (ctx) => {
        const { deleteScheduleOperation, httpConstants } = ctx.container.cradle;
        const { date } = ctx.query;

        await deleteScheduleOperation.execute(date);

        return ctx.res.status(httpConstants.OK).json({});
    })
});
