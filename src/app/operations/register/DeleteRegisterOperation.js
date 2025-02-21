module.exports = ({ deleteRegisterService, verifyJwtService }) => ({
    execute: async (register_id, authorization) => {
        await verifyJwtService.execute(authorization);
        return await deleteRegisterService.execute(register_id);
    }
});