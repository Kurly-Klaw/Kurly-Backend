const moment = require('moment');

module.exports = ({ scheduleRepository }) => ({
    execute: async (query) => {
        const schedulesFound = [];
        const { start_date, end_date } = query;

        try {
            if (!end_date) {
                const scheduleRetrieved = await scheduleRepository.findOneSchedule({
                    where: {
                        date: start_date
                    }
                });
                schedulesFound.push(scheduleRetrieved);
            }
            else {
                const momentAtualDate = moment(start_date, 'YYYY/MM/DD');
                const momentEndDate = moment(end_date, 'YYYY/MM/DD');

                let requestedDate = momentAtualDate;
                while (requestedDate.date() != momentEndDate.date() + 1) {
                    const query = {
                        where: {
                            date: requestedDate
                        }
                    }
                    const scheduleRetrieved = await scheduleRepository.findOneSchedule(query);
                    schedulesFound.push(scheduleRetrieved);
                    requestedDate = requestedDate.add(1, 'd');
                }
            }

            if (schedulesFound.length > 0) {
                return schedulesFound;
            } else {
                return [];
            }
        } catch (error) {
            console.log('getSchedules - date:', start_date, ' end_date', end_date, ' - [Error]: ', error);
            throw error;
        }
    }
});
