module.exports = ({ updateUserService }) => ({
    execute: async (body, email) => {
        return await updateUserService.execute(body, email);
    }
});