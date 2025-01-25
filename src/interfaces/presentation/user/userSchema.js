const joi = require('@hapi/joi');

const loginBodySchema = {
    body: joi.object().keys({
        email: joi.string().trim().options({ convert: true }).email().example('example@gmail.com').required(),
        password: joi.string().trim().options({ convert: true }).required().min(5).max(16).example('sdasdfqew1234'),
    })
};

const getUserParamsSchema = {
    params: joi.object().keys({
        query: joi.string().trim().options({ convert: true }).email().required()
    }),
};

const updateUsersHeaderSchema = {
    headers: joi.object().keys({
        email: joi.string().trim().options({ convert: true }).email().example('example@gmail.com').required()
    })
};

const updateUserBodySchema = {
    body: joi.object().keys({
        name: joi.string().trim().options({ convert: true }).required().example('gabriel'),
        email: joi.string().trim().options({ convert: true }).email().example('example@gmail.com').required(),
        password: joi.string().trim().options({ convert: true }).required().min(5).max(16).example('sdasdfqew1234'),
        role: joi.string().trim().options({ convert: true }).required().example('sdasdfqew1234')
    })
};

const deleteUserHeadersSchema = {
    headers: joi.object().keys({
        email: joi.string().trim().options({ convert: true }).email().example('example@gmail.com').required()
    })
};

const createUserBodySchema = {
    body: joi.object().keys({
        name: joi.string().trim().options({ convert: true }).required().example('gabriel'),
        email: joi.string().trim().options({ convert: true }).email().example('example@gmail.com').required(),
        password: joi.string().trim().options({ convert: true }).required().min(5).max(16).example('sdasdfqew1234'),
        role: joi.string().trim().options({ convert: true }).required().example('sdasdfqew1234')
    })
};

module.exports = () => ({
    loginBodySchema,
    getUserParamsSchema,
    updateUsersHeaderSchema,
    updateUserBodySchema,
    deleteUserHeadersSchema,
    createUserBodySchema,
    bodyOptions: { abortEarly: false, convert: false, allowUnknown: true, stripUnknown: true }
});

