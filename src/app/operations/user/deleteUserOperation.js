module.exports = ({ deleteUserService }) => ({
    execute: async (user_id) => {
        return await deleteUserService.execute(user_id);
    }
});