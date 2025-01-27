const { query } = require("express");

module.exports = ({ container }) => {
    const { scheduleController , scheduleSchema } = container.cradle;

    return [
        {
            method: 'post',
            path: '/schedule',
            middlewares: [],
            tags: ['schedule'],
            validation: {
                body: scheduleSchema.createScheduleBodySchema.body
            },
            handler: scheduleController.createSchedule
        },
        {
            method: 'put',
            path: '/schedule',
            tags: ['schedule'],
            validation: {
                body: scheduleSchema.updateScheduleBodySchema.body,
                query: scheduleSchema.updateScheduleQuerySchema.query
            },
            handler: scheduleController.updateSchedule
        },

        {
            method: 'delete',
            path: '/schedule',
            tags: ['schedule'],
            validation: {
                query: scheduleSchema.deleteScheduleQuerySchema.query
            },
            handler: scheduleController.deleteSchedule
        },

        {
            method: 'get',
            path: '/schedule',
            tags: ['schedule'],
            validation: {
                query: scheduleSchema.getScheduleQuerySchema.query
            },
            handler: scheduleController.retrieveSchedule
        }
    ];
};
