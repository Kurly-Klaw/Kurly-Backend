module.exports = ({ retrieveRegisterService, verifyJwtService }) => ({
    execute: async (query, authorization) => {
        await verifyJwtService.execute(authorization);
        return await retrieveRegisterService.execute(query);
    }
});