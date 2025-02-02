const errorFactory = require('../../../domain/error/ErrorFactory');

module.exports = ({ scheduleRepository, exception }) => ({
    execute: async (date, schedule, blockedValue) => {
        try {
            const query = {
                where: {
                    date: date
                }
            };

            const scheduleDateExisted = await scheduleRepository.findOneSchedule(query);

            if (!scheduleDateExisted) {
                throw exception.notFound(errorFactory([
                    `The schedule request was not found`,
                    `The schedule request was not found`
                ]));
            }
            else {
                let isTimeExist = false;
                scheduleDateExisted.schedules.forEach((element) => {
                    if (schedule.start_hour == element.start_hour && schedule.end_hour === element.end_hour) {
                        element.is_scheduled = blockedValue;
                        isTimeExist = true;
                    }
                });
                if (isTimeExist) {
                    const resquestedPayload = {
                        date: date,
                        schedules: scheduleDateExisted.schedules
                    };
                    await scheduleRepository.updateSchedule(resquestedPayload, query);
                } else {
                    throw exception.notFound(errorFactory([
                        `The schedule requested not exist in this date, please selected another schedule`,
                        `The schedule requested not exist in this date, please selected another schedule`
                    ]));
                }
            }
        } catch (error) {
            console.log('validate schedule occupance service:', ' - [Error]: ', error);
            throw error;
        }
    }
});