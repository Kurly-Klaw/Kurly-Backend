const { findOneUser } = require("../../../infra/database/repository/userRepository");

const checkUser = async (body, res, next) => {
    try {
        const queryEmail = {
            where: {
                email: body.email,
            },
        };

        const emailcheck = await findOneUser(queryEmail);
        if (emailcheck) {
            return res.status(403).send("Email is duplicate. You don't have permission to perform this operation!");
        }

        const queryUser = {
            where: {
                userName: body.userName,
            },
        };

        const username =  await findOneUser(queryUser);
        if (username) {
            return res.status(409).send("username already token");
        }
        next();
    } catch (error) {
        console.log(error);
    }
};


module.exports = {
 checkUser
};