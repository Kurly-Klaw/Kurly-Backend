module.exports = ({ createScheduleService }) => ({
    execute: async (transactionData) => {
        return await createScheduleService.execute(transactionData);
    }
});