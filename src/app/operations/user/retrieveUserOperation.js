module.exports = ({ retrieveUserService, verifyJwtService }) => ({
    execute: async (query, authorization) => {
        await verifyJwtService.execute(authorization);
        return await retrieveUserService.execute(query);
    }
});