module.exports = ({ createUserService, checkUserAlreadyExistService }) => ({
    execute: async (transactionData, res) => {
        await checkUserAlreadyExistService.execute(transactionData);
        return await createUserService.execute(transactionData, res);
    }
});