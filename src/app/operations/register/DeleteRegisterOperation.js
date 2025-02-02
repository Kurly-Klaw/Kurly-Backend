module.exports = ({ deleteRegisterService }) => ({
    execute: async (register_id) => {
        return await deleteRegisterService.execute(register_id);
    }
});