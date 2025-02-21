module.exports = ({ createScheduleService, verifyJwtService }) => ({
    execute: async (transactionData, authorization) => {
        await verifyJwtService.execute(authorization);
        return await createScheduleService.execute(transactionData);
    }
});