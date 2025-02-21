module.exports = ({ updateScheduleService, verifyJwtService }) => ({
    execute: async (body, query, authorization) => {
        await verifyJwtService.execute(authorization);
        return await updateScheduleService.execute(body, query);
    }
});