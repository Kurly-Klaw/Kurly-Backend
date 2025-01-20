const joi = require('@hapi/joi');

const loginBodySchema = {
    email: joi.string().trim().options({ convert: true }).email().example('example@gmail.com').required(),
    password: joi.string().trim().options({ convert: true }).required().min(5).max(16).example('sdasdfqew1234'),
};


const getUserHeadersSchema = {
    email: joi.string().trim().options({ convert: true }).email().example('example@gmail.com').required()
};

const updateUsersHeaderSchema = {
    email: joi.string().trim().options({ convert: true }).email().example('example@gmail.com').required()
};

const updateUserBodySchema = {
    name: joi.string().trim().options({ convert: true }).required().example('gabriel'),
    email: joi.string().trim().options({ convert: true }).email().example('example@gmail.com').required(),
    password: joi.string().trim().options({ convert: true }).required().min(5).max(16).example('sdasdfqew1234'),
    role: joi.string().trim().options({ convert: true }).required().example('sdasdfqew1234'), 
};

const deleteUserHeadersSchema = {
    email: joi.string().trim().options({ convert: true }).email().example('example@gmail.com').required()
};

const createUserBodySchema = {
    name: joi.string().trim().options({ convert: true }).required().example('gabriel'),
    email: joi.string().trim().options({ convert: true }).email().example('example@gmail.com').required(),
    password: joi.string().trim().options({ convert: true }).required().min(5).max(16).example('sdasdfqew1234'),
    role: joi.string().trim().options({ convert: true }).required().example('sdasdfqew1234'), 
};

module.exports = () => ({
    headers,
    loginBodySchema,
    getUserHeadersSchema,
    updateUsersHeaderSchema,
    updateUserBodySchema,
    deleteUserHeadersSchema,
    createUserBodySchema,
    bodyOptions: { abortEarly: false, convert: false, allowUnknown: true, stripUnknown: true }
});

