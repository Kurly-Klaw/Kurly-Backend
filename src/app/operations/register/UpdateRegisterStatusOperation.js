module.exports = ({ updateRegisterStatusService }) => ({
    execute: async (body, register_id) => {
        return await updateRegisterStatusService.execute(body, register_id);
    }
});