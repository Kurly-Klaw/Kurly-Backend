module.exports = ({ retrieveRegisterByIdService }) => ({
    execute: async (register_id) => {
        return await retrieveRegisterByIdService.execute(register_id);
    }
});