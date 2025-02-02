module.exports = ({ updateUserService }) => ({
    execute: async (body, user_id) => {
        return await updateUserService.execute(body, user_id);
    }
});