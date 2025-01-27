module.exports = ({ deleteScheduleService }) => ({
    execute: async (date) => {
        return await deleteScheduleService.execute(date);
    }
});