const joi = require('@hapi/joi');
const DateValidator = require('../../../infra/suppport/DateValidator');

const createRegisterBodySchema = {
    body: joi.object().keys({
        name: joi.string().trim().options({ convert: true }).example('Chico').required(),
        treatment: joi.string().trim().options({ convert: true }).example('Plano natural').required(),
        value: joi.number().options({ convert: true }).required().example('100').required(),
        additions: joi.array().items(
            joi.object().keys({
                addition: joi.string().example('corte').trim().options({ convert: true }),
                value: joi.number().options({ convert: true }).required().example('100'),
            })
        ),
        date: joi.string().custom(DateValidator).example('2025-06-21').required(),
        schedule:joi.object().keys({
                start_hour: joi.string().max(5).example('08:00').trim().options({ convert: true }),
                end_hour: joi.string().max(5).example('10:00').trim().options({ convert: true })
        }).required(),
    })
};

const getRegisterByIdParamsSchema = {
    params: joi.object().keys({
        register_id: joi.string().guid({ version: ['uuidv4'] }).required(),
    }),
};

const getRegisterQuerySchema = {
   query: joi.object().keys({
        date: joi.string().custom(DateValidator).example('2025-06-21').required(),
    })
};

const updateRegisterParamsSchema = {
    params: joi.object().keys({
        register_id: joi.string().trim().options({ convert: true }).email().example('example@gmail.com').required()
    })
};

const updateRegisterBodySchema = {
    body: joi.object().keys({
        name: joi.string().trim().options({ convert: true }).example('Chico').required(),
        treatment: joi.string().trim().options({ convert: true }).example('Plano natural').required(),
        value: joi.number().options({ convert: true }).required().example('100').required(),
        additions: joi.array().items(
            joi.object().keys({
                addition: joi.string().example('corte').trim().options({ convert: true }),
                value: joi.number().options({ convert: true }).required().example('100'),
            })
        ),
        date: joi.string().custom(DateValidator).example('2025-06-21').required(),
        schedule:joi.object().keys({
                start_hour: joi.string().max(5).example('08:00').trim().options({ convert: true }),
                end_hour: joi.string().max(5).example('10:00').trim().options({ convert: true })
        }).required(),
    })
};

const deleteRegisterParamsSchema = {
    params: joi.object().keys({
        register_id: joi.string().trim().options({ convert: true }).email().example('example@gmail.com').required()
    })
};

module.exports = () => ({
    getRegisterByIdParamsSchema,
    getRegisterQuerySchema,
    updateRegisterBodySchema,
    deleteRegisterParamsSchema,
    createRegisterBodySchema,
    updateRegisterParamsSchema,
    bodyOptions: { abortEarly: false, convert: false, allowUnknown: true, stripUnknown: true }
});

