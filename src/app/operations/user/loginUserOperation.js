module.exports = ({ loginUserService }) => ({
    execute: async (body, res) => {
        return await loginUserService.execute(body, res);
    }
});