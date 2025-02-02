const errorFactory = require('../../../domain/error/ErrorFactory');

module.exports = ({ registerRepository, exception, changeBlockedStatusService, updateCurrentScheduleService, updateHistoryService  }) => ({
    execute: async (register_id) => {
        try {
            const query = {
                where: { register_id: register_id }
            };

            const registerFound = await registerRepository.findOneRegister(query);
            await changeBlockedStatusService.execute(registerFound.date, registerFound.schedule, false);

            await updateCurrentScheduleService.execute(null, registerFound.user_id, registerFound.register_id);
            const history = {
                date: registerFound.date,
                treatment: registerFound.treatment,
                total_value: registerFound.total_value,
                status: 'deleted'
            };
            await updateHistoryService.execute(history, registerFound.user_id);


            if (!registerFound) {
                throw exception.notFound(errorFactory([
                    `Any register  found with the register_id ${register_id}`,
                    `Any register  found with the register_id ${register_id}`
                ]));
            } else {
                await registerRepository.deleteRegister(registerFound);
            }
        } catch (error) {
            console.log('deleteRegister - register:', register_id, ' - [Error]: ', error);
            throw error;
        }
    }
});