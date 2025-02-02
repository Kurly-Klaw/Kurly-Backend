module.exports = ({ updateRegisterService }) => ({
    execute: async (body, register_id) => {
        return await updateRegisterService.execute(body, register_id);
    }
});