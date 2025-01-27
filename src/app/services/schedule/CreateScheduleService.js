const moment = require('moment');

module.exports = ({ scheduleRepository }) => ({
    execute: async (body) => {
        try {
            const createdSchedules = [];
            body.schedules.forEach((schedule) => {
                schedule.is_scheduled = false;
            });
            const momentAtualDate = moment(body.date,'YYYY/MM/DD');

            if(body.end_date){
                const createdSchedules = [];
                const momentEndDate = moment(body.end_date,'YYYY/MM/DD');
                let requestedDate = momentAtualDate;
                
                while(requestedDate.date() != momentEndDate.date()+1){
                    const requestPayload = {
                        date: requestedDate,
                        schedules: body.schedules
                    };
                    const createdSchedule = await scheduleRepository.createSchedule(requestPayload);
                    createdSchedules.push(createdSchedule);

                    requestedDate = requestedDate.add(1,'d');
                }

                return createdSchedules;
            }
            else{
                const createdSchedule = await scheduleRepository.createSchedule(body);
                createdSchedules.push(createdSchedule);
            }

            return createdSchedules;
        } catch (error) {
            console.log('create schedules - [Error]: ', error);
            throw error;
        }
    }
});
