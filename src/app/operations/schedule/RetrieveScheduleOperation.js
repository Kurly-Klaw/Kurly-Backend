module.exports = ({ retrieveScheduleService, verifyJwtService }) => ({
    execute: async (query) => {
        return await retrieveScheduleService.execute(query);
    }
});