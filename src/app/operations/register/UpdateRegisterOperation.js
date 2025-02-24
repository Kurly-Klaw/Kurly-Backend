module.exports = ({ updateRegisterService, verifyJwtService }) => ({
    execute: async (body, register_id, authorization) => {
        await verifyJwtService.execute(authorization);
        return await updateRegisterService.execute(body, register_id);
    }
});