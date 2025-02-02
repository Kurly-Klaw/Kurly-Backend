const errorFactory = require('../../../domain/error/ErrorFactory');
const moment = require('moment');
const EnumRegisterStatus = require('../../../domain/enum/EnumRegisterStatus');


module.exports = ({ registerRepository, exception, changeBlockedStatusService, validateScheduleOccupanceService, updateCurrentScheduleService }) => ({
    execute: async (body, register_id) => {
        try {

            const query = {
                where: {
                    register_id: register_id
                }
            };

            const registerFound = await registerRepository.findOneRegister(query);

            if (!registerFound) {
                throw exception.notFound(errorFactory([
                    `Any register found with the register_id:${register_id}`,
                    `Any register found with the register_id:${register_id}`
                ]));
            }

            if (registerFound.status === EnumRegisterStatus.DONE || registerFound.status === EnumRegisterStatus.REVIEW) {
                throw exception.forbidden(errorFactory([
                    `You can't update a register that is already done`,
                    `You can't update a register that is already done`
                ]));
            }

            if (isDateOrHourChanged(registerFound, body)) {
                const updatedBody = { ...registerFound, ...body };
                await registerRepository.updateRegister(updatedBody, query);
            } else {
                await changeBlockedStatusService.execute(registerFound.date, registerFound.schedule, false);
                await validateScheduleOccupanceService.execute({ date: body.date, schedule: body.schedule });
                const updatedBody = { ...registerFound, ...body };
                await registerRepository.updateRegister(updatedBody, query);


                await updateCurrentScheduleService.execute(null, registerFound.user_id, registerFound.register_id);
                const currentSchedule = {
                    register_id: updatedBody.register_id,
                    treatment: updatedBody.treatment,
                    date: updatedBody.date,
                    total_value: updatedBody.total_value,
                    status: updatedBody.status
                };
                await updateCurrentScheduleService.execute(currentSchedule, registerFound.user_id);
            }

            const newRegisterFound = await registerRepository.findOneRegister(query);
            return newRegisterFound;

        } catch (error) {
            console.log('updateRegister:', ' - [Error]: ', error);
            throw error;
        }
    }
});

function isDateOrHourChanged(atualRegister, newRegister) {
    const isSameStartHour = atualRegister.schedule.start_hour === newRegister.schedule.start_hour;
    const isSameEndHour = atualRegister.schedule.end_hour === newRegister.schedule.end_hour;
    const isSameStartDate = atualRegister.date == atualRegister.date;

    return isSameStartHour && isSameEndHour && isSameStartDate;
}
