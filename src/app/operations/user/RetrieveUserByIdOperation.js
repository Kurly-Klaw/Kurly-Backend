module.exports = ({ retrieveUserByIdService, verifyJwtService }) => ({
    execute: async (user_id, authorization) => {
        await verifyJwtService.execute(authorization);
        return await retrieveUserByIdService.execute(user_id);
    }
});