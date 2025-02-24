const errorFactory = require('../../../domain/error/ErrorFactory');
const EnumRegisterStatus = require('../../../domain/enum/EnumRegisterStatus');


module.exports = ({ registerRepository, exception, updateCurrentScheduleService, updateHistoryService }) => ({
    execute: async (body, register_id) => {
        try {
            const query = {
                where: {
                    register_id: register_id
                }
            };

            const register = await registerRepository.findOneRegister(query);

            if (!register) {
                throw exception.notFound(errorFactory([
                    `Any register found with the register_id:${register_id}`,
                    `Any register found with the register_id:${register_id}`
                ]));
            }

            if (register.status === EnumRegisterStatus.REVIEW) {
                throw exception.forbidden(errorFactory([
                    `You can't update a register that is already reviewed`,
                    `You can't update a register that is already reviewed`
                ]));
            }

            if (body.status === EnumRegisterStatus.DENIED) {
                if (register.status === EnumRegisterStatus.SCHEDULED) {
                    const updatedBody = { ...register, ...body };
                    await registerRepository.updateRegister(updatedBody, query);
                    await updateCurrentScheduleService.execute(null, register.user_id, register.register_id);
                }
                else {
                    throw exception.forbidden(errorFactory([
                        `You can only denied registers there are scheduled`,
                        `You can only denied registers there are scheduled`
                    ]));
                }
            }

            if (body.status === EnumRegisterStatus.APPROVED) {
                if (register.status === EnumRegisterStatus.SCHEDULED) {
                    const updatedBody = { ...register, ...body };
                    await registerRepository.updateRegister(updatedBody, query);
                }
                else {
                    throw exception.forbidden(errorFactory([
                        `You can only aprroved registers there are scheduled`,
                        `You can only aprroved registers there are scheduled`
                    ]));
                }
            }

            if (body.status === EnumRegisterStatus.DONE) {
                if (register.status === EnumRegisterStatus.APPROVED) {
                    const updatedBody = { ...register, ...body };
                    await registerRepository.updateRegister(updatedBody, query);
                    const history = {
                        date: register.date,
                        treatment: register.treatment,
                        total_value: register.total_value,
                        status: register.status
                    };
                    await updateHistoryService.execute(history, register.user_id);
                }
                else {
                    throw exception.forbidden(errorFactory([
                        `You can only finish registers there are aprroved`,
                        `You can only finish registers there are aprroved`
                    ]));
                }
            }

            if (body.status === EnumRegisterStatus.REVIEW) {
                if (register.status === EnumRegisterStatus.DONE) {
                    const updatedBody = { ...register, ...body };
                    await registerRepository.updateRegister(updatedBody, query);
                    await updateCurrentScheduleService.execute(null, register.user_id, register.register_id);
                }
                else {
                    throw exception.forbidden(errorFactory([
                        `You can only review registers there are done`,
                        `You can only review registers there are done`
                    ]));
                }
            }

            const newUpdatedRegister = await registerRepository.findOneRegister(query);
            return newUpdatedRegister;
            
        } catch (error) {
            console.log('updateRegisterStatus:', body.status, ' - [Error]: ', error);
            throw error;
        }
    }
});
