const joi = require('@hapi/joi');
const EnumUserType = require('../../../domain/enum/EnumUserType');


const headersAutorizationToken = {
    headers: joi.object().keys({
        authorization: joi.string().example('any_token').required()
    })
};

const loginBodySchema = {
    body: joi.object().keys({
        email: joi.string().trim().options({ convert: true }).email().example('example@gmail.com').required(),
        password: joi.string().trim().options({ convert: true }).required().min(5).max(16).example('sdasdfqew1234'),
    })
};

const getUserParamsSchema = {
    params: joi.object().keys({
        query: joi.string().trim().options({ convert: true }).required()
    }),
};

const getUserByIdParamsSchema = {
    params: joi.object().keys({
        user_id: joi.string().guid({ version: ['uuidv4'] }).required()
    }),
};

const updateUsersHeaderSchema = {
    headers: joi.object().keys({
        user_id: joi.string().guid({ version: ['uuidv4'] }).required(),
        authorization: joi.string().options({ convert: true }).example('any_token').required()
    })
};

const updateUserBodySchema = {
    body: joi.object().keys({
        name: joi.string().trim().options({ convert: true }).example('gabriel'),
        email: joi.string().trim().options({ convert: true }).email().example('example@gmail.com'),
        phone_number: joi.string().trim().options({ convert: true }).example('88993669345'),
        imagem: joi.string().trim().options({ convert: true }).example('image_blob'),
        hair_problems: joi.array().items(joi.string()).example(['ponta dupla', 'quimica']),
        hair_routine: joi.string().trim().options({ convert: true }).example('Any hair routine'),
        hair_size: joi.string().trim().options({ convert: true }).example('Grande'),
        hair_type: joi.string().trim().options({ convert: true }).example('Odulado'),
        password: joi.string().trim().options({ convert: true }).min(5).max(16).example('sdasdfqew1234'),
        role: joi.string().trim().options({ convert: true }).valid(...EnumUserType.values()).example(EnumUserType.USER)
    })
};

const deleteUserHeadersSchema = {
    headers: joi.object().keys({
        user_id: joi.string().guid({ version: ['uuidv4'] }).required(),
        authorization: joi.string().example('any_token').required()
    })
};

const createUserBodySchema = {
    body: joi.object().keys({
        name: joi.string().trim().options({ convert: true }).required().example('gabriel'),
        email: joi.string().trim().options({ convert: true }).email().example('example@gmail.com').required(),
        phone_number: joi.string().trim().options({ convert: true }).example('88993669345'),
        imagem: joi.string().trim().options({ convert: true }).example('image_blob'),
        hair_problems: joi.array().items(joi.string()).example(['ponta dupla', 'quimica']),
        hair_routine: joi.string().trim().options({ convert: true }).example('Any hair routine'),
        hair_size: joi.string().trim().options({ convert: true }).example('Grande'),
        hair_type: joi.string().trim().options({ convert: true }).example('Odulado'),
        password: joi.string().trim().options({ convert: true }).required().min(5).max(16).example('sdasdfqew1234'),
        role: joi.string().trim().options({ convert: true }).valid(...EnumUserType.values()).example(EnumUserType.USER)
    })
};

module.exports = () => ({
    loginBodySchema,
    getUserParamsSchema,
    updateUsersHeaderSchema,
    updateUserBodySchema,
    deleteUserHeadersSchema,
    getUserByIdParamsSchema,
    createUserBodySchema,
    headersAutorizationToken,
    bodyOptions: { abortEarly: false, convert: false, allowUnknown: true, stripUnknown: true }
});

