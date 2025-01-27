module.exports = ({ deleteRegisterService }) => ({
    execute: async (params) => {
        return await deleteRegisterService.execute(params);
    }
});