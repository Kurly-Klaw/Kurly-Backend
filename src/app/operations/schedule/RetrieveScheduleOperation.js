module.exports = ({ retrieveScheduleService, verifyJwtService }) => ({
    execute: async (query, authorization) => {
        await verifyJwtService.execute(authorization);
        return await retrieveScheduleService.execute(query);
    }
});