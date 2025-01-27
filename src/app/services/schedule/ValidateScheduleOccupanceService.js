const errorFactory = require('../../../domain/error/ErrorFactory');
const moment = require('moment');

module.exports = ({ scheduleRepository, exception }) => ({
    execute: async (transactionData) => {
        try {
            const { schedule, date } = transactionData;

            const query = {
                where: {
                    date: date
                }
            };

            const scheduleDateExisted = await scheduleRepository.findOneSchedule(query);

            console

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
                        if (element.is_scheduled == false) {
                            element.is_scheduled = true;
                            isTimeExist = true;
                        } else {
                            throw exception.forbidden(errorFactory([
                                `The schedule request is already selected, please selected another schedule`,
                                `The schedule request is already selected, please selected another schedule`
                            ]));
                        }
                    }
                });
                console.log(isTimeExist);
                if (isTimeExist) {
                    console.log(JSON.stringify(scheduleDateExisted.schedules))
                    await scheduleRepository.updateSchedule(scheduleDateExisted, query);
                }
            }
        } catch (error) {
            console.log('validate schedule occupance service:', ' - [Error]: ', error);
            throw error;
        }
    }
});