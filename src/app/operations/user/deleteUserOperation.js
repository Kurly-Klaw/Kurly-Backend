module.exports = ({ deleteUserService }) => ({
    execute: async (email) => {
        return await deleteUserService.execute(email);
    }
});