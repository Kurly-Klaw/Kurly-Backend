module.exports = ({ updateUserService, verifyJwtService }) => ({
    execute: async (body, user_id, authorization) => {
        await verifyJwtService.execute(authorization);
        return await updateUserService.execute(body, user_id);
    }
});