module.exports = ({ createRegisterService, validateScheduleOccupanceService, updateCurrentScheduleService }) => ({
    execute: async (transactionData, user_id) => {       
        await validateScheduleOccupanceService.execute(transactionData);
        const createdRegister = await createRegisterService.execute(transactionData, user_id);
        const currentSchedule = {
                register_id: createdRegister.register_id,
                treatment: createdRegister.treatment,
                date: createdRegister.date,
                total_value: createdRegister.total_value,
                status: createdRegister.status
        };
        await updateCurrentScheduleService.execute(currentSchedule, user_id);
        return createdRegister;
    }
});