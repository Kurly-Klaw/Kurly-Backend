module.exports = ({ createRegisterService, validateScheduleOccupanceService }) => ({
    execute: async (transactionData) => {
        await validateScheduleOccupanceService.execute(transactionData);
        return await createRegisterService.execute(transactionData);
        
    }
});