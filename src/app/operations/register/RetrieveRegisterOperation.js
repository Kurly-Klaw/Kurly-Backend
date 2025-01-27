module.exports = ({ retrieveRegisterService }) => ({
    execute: async (query) => {
        return await retrieveRegisterService.execute(query);
    }
});