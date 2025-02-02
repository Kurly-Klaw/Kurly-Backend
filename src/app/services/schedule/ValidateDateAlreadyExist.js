const moment = require('moment');

module.exports = ({ scheduleRepository }) => ({
    execute: async (date) => {
        try {
            const scheduleRetrieved = await scheduleRepository.findOneSchedule({
                where: {
                    date: date
                }
            });

            const sheduleAreadyExist = scheduleRetrieved ? false : true;
            return sheduleAreadyExist;
        } catch (error) {
            console.log('validateDateAlreadyExist - date:', date,' - [Error]: ', error);
            throw error;
        }
    }
});
