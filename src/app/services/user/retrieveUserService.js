const { findOneUser, findAllUser } = require("../../../infra/database/repository/userRepository");
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

const retrieveUser = async (query, res) => {

    console.log('getUser - query: ', query);

    if (!query) {
        console.log("Requested item wasn't found!, ?query=xxxx is required!");
        return res.status(409).send("?query=xxxx is required! NB: xxxx is all / email");
    }

    try {
        if (query == 'all') {
            const users = await findAllUser({
                attributes: { exclude: ['password'] },
                where: {
                    role: {[Op.not]: 'admin'}
                }
            });
            
            if (users) {
                return res.status(200).json(users);
            } else {
                return res.status(400).send("any user found");
            }
        } else {
            const user = await findOneUser({
                where: {
                    email: query
                },
                attributes: { exclude: ['password'] }
            });

            if (user) {
                return res.status(200).json(user);
            } else {
                return res.status(400).send("Invalid request body");
            }
        }
    } catch (error) {
        console.log('getUser - queryType:', queryType, ' - [Error]: ', error);
    }
}

module.exports = { retrieveUser };