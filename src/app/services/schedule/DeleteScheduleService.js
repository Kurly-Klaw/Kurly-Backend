const errorFactory = require('../../../domain/error/ErrorFactory');

module.exports = ({ scheduleRepository, exception }) => ({
    execute: async (date) => {
        try {
            const query = {
                where: { date: date }
            };
            const user = await scheduleRepository.findOneSchedule(query);

            if (!user) {
                throw exception.notFound(errorFactory([
                    `Schedule not found with this email ${date}`,
                    `Schedule not found with this email ${date}`
                ]));
            } else {
                await scheduleRepository.deleteSchedule(user);
            }
        } catch (error) {
            console.log('deleteSchedule - date:', date, ' - [Error]: ', error);
            throw error;
        }
    }
});