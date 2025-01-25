module.exports = ({ retrieveUserService }) => ({
    execute: async (query) => {
        return await retrieveUserService.execute(query);
    }
});