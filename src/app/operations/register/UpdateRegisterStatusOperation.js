module.exports = ({ updateRegisterStatusService, verifyJwtService}) => ({
    execute: async (body, register_id, authorization) => {
        await verifyJwtService.execute(authorization);
        return await updateRegisterStatusService.execute(body, register_id);
    }
});