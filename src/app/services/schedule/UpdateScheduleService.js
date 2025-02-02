const errorFactory = require('../../../domain/error/ErrorFactory');
const moment = require('moment');

module.exports = ({ scheduleRepository, exception }) => ({
    execute: async (body, query) => {
        try {
            const { start_date, end_date } = query;

            const updatedSchedules = [];

            body.schedules.forEach((schedule) => {
                schedule.is_scheduled = false;
            });

            const momentAtualDate = moment(start_date, 'YYYY/MM/DD');

            if (end_date) {
                const momentEndDate = moment(end_date, 'YYYY/MM/DD');
                let requestedDate = momentAtualDate;

                while (requestedDate.date() != momentEndDate.date() + 1) {

                    const query = {
                        where: {
                            date: requestedDate
                        }
                    };

                    const schedule = await scheduleRepository.findOneSchedule(query);

                    if (schedule) {
                        if (scheduleHaveSomeTimeBlocked(schedule)) {
                            throw exception.forbidden(errorFactory([
                                `The schedule can not be updated because a schedule is already blocked by a register`,
                                `The schedule can not be updated because a schedule is already blocked by a register`
                            ]));
                        }
                        const requestPayload = {
                            date: requestedDate,
                            schedules: body.schedules
                        };
                        await scheduleRepository.updateSchedule(requestPayload, query);

                        const createdSchedule = await scheduleRepository.findOneSchedule(query);

                        updatedSchedules.push(createdSchedule);
                    }

                    requestedDate = requestedDate.add(1, 'd');
                }
            }
            else {
                const query = {
                    where: {
                        date: start_date
                    }
                };
                const schedule = await scheduleRepository.findOneSchedule(query);

                if (schedule) {
                    if (scheduleHaveSomeTimeBlocked(schedule)) {
                        throw exception.forbidden(errorFactory([
                            `The schedule can not be updated because a schedule is already blocked by a register`,
                            `The schedule can not be updated because a schedule is already blocked by a register`
                        ]));
                    }

                    const requestPayload = {
                        date: start_date,
                        schedules: body.schedules
                    };

                    await scheduleRepository.updateSchedule(requestPayload, query);

                    const updatedSchedule = await scheduleRepository.findOneSchedule(query);
                    updatedSchedules.push(updatedSchedule);
                }
            }

            if (updatedSchedules.length > 0) {
                return updatedSchedules;
            } else {
                throw exception.notFound(errorFactory([
                    `Any schedule found in the range requested`,
                    `Any schedule found in the range requested`
                ]));
            }
        } catch (error) {
            console.log('updateSchedules:', ' - [Error]: ', error);
            throw error;
        }
    }
});

function scheduleHaveSomeTimeBlocked(data) {
    let isBlocked;
    data.schedules.forEach((schedule) => {
        if (schedule.is_scheduled == true) isBlocked = true;
    })
    return isBlocked;
}
