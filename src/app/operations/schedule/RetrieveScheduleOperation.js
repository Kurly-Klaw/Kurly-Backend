module.exports = ({ retrieveScheduleService }) => ({
    execute: async (query) => {
        return await retrieveScheduleService.execute(query);
    }
});