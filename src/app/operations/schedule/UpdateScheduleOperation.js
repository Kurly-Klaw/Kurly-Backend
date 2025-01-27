module.exports = ({ updateScheduleService }) => ({
    execute: async (body, query) => {
        return await updateScheduleService.execute(body, query);
    }
});