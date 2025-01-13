const { checkUser } = require("../../../app/services/user/checkUserAlreadyExistService");

const check = async (req, res, next) => {
    await checkUser(req.body, res, next);
};

module.exports = { check };