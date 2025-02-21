module.exports = ({ retrieveRegisterByIdService, verifyJwtService }) => ({
    execute: async (register_id, authorization) => {
        await verifyJwtService.execute(authorization);
        return await retrieveRegisterByIdService.execute(register_id);
    }
});