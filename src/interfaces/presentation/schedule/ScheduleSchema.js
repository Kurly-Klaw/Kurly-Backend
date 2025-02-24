const joi = require('@hapi/joi').extend(require('@hapi/joi-date'));
const DateValidator = require('../../../infra/suppport/DateValidator');

const headersAutorizationToken = {
    headers: joi.object().keys({
        authorization: joi.string().example('any_token').required()
    })
};

const createScheduleBodySchema = {
    body: joi.object().keys({
        date: joi.string().custom(DateValidator).example('2025-06-21').required(),
        end_date: joi.string().custom(DateValidator).example('2025-06-21'),
        schedules: joi
            .array()
            .items(
                joi.object().keys({
                    start_hour: joi.string().max(5).example('10:00').trim().options({ convert: true }),
                    end_hour: joi.string().max(5).example('10:00').trim().options({ convert: true })
                })
            )
            .required()
    })
};

const getScheduleQuerySchema = {
    query: joi.object().keys({
        start_date: joi.string().custom(DateValidator).example('2025-06-21').required(),
        end_date: joi.string().custom(DateValidator).example('2025-06-21')
    })
};

const updateScheduleQuerySchema = {
    query: joi.object().keys({
        start_date: joi.string().custom(DateValidator).example('2025-06-21').required(),
        end_date: joi.string().custom(DateValidator).example('2025-06-21')
    })
};

const updateScheduleBodySchema = {
    body: joi.object().keys({
        schedules: joi
            .array()
            .items(
                joi.object().keys({
                    start_hour: joi.string().max(5).example('08:00').trim().options({ convert: true }),
                    end_hour: joi.string().max(5).example('10:00').trim().options({ convert: true })
                })
            )
            .required()
    })
};

const deleteScheduleQuerySchema = {
    query: joi.object().keys({
        date: joi.string().custom(DateValidator).example('2025-06-21').required()
    })
};


module.exports = () => ({
    createScheduleBodySchema,
    getScheduleQuerySchema,
    updateScheduleQuerySchema,
    updateScheduleBodySchema,
    deleteScheduleQuerySchema,
    headersAutorizationToken,
    bodyOptions: { abortEarly: false, convert: false, allowUnknown: true, stripUnknown: true }
});

