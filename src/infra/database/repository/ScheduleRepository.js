const db = require("../index");
const schedules = db.schedules;

class ScheduleRepository {
    constructor() { }

    async findOneSchedule(query) {
        try {
            const schedulesFound = await schedules.findOne(query);
            return schedulesFound;
        } catch (error) {
            console.log('Database error: ', error);
        }
    }
    async createSchedule(data) {
        try {
            const schedulesCreated = await schedules.create(data);
            return schedulesCreated;
        } catch (error) {
            console.log('Database error: ', error);
        }
    }
    async findAllSchedule(query) {
        try {
            const schedulesList = await schedules.findAll(query);
            return schedulesList;
        } catch (error) {
            console.log('Database error: ', error);
        }
    }
    async updateSchedule(data, query) {
        try {
            const updatedschedules = await schedules.update(data, query);
            return updatedschedules;
        } catch (error) {
            console.log('Database error: ', error);
        }
    }
    async deleteSchedule(schedules) {
        try {
            await schedules.destroy();
        } catch (error) {
            console.log('Database error: ', error);
        }
    }
}

module.exports = ScheduleRepository;