module.exports = ({ deleteScheduleService, verifyJwtService }) => ({
    execute: async (date, authorization) => {
        await verifyJwtService.execute(authorization);
        return await deleteScheduleService.execute(date);
    }
});