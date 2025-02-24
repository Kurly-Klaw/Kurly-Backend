module.exports = ({ deleteUserService, authorization }) => ({
    execute: async (user_id) => {
        await verifyJwtService.execute(authorization);
        return await deleteUserService.execute(user_id);
    }
});