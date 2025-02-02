module.exports = ({ retrieveUserByIdService }) => ({
    execute: async (user_id) => {
        return await retrieveUserByIdService.execute(user_id);
    }
});