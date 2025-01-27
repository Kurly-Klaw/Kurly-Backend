module.exports = ({ updateRegisterService }) => ({
    execute: async (body, params) => {
        return await updateRegisterService.execute(body, params);
    }
});