const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const errorFactory = require('../../../domain/error/ErrorFactory');
const EnumUserType = require('../../../domain/enum/EnumUserType');

module.exports = ({ userRepository, exception }) => ({
    execute: async (query) => {
        console.log('getUser - query: ', query);
        try {
            if (query == 'all') {
                const usersRetrieved = await userRepository.findAllUser({
                    attributes: { exclude: ['password'] },
                    where: {
                        role: {[Op.not]: EnumUserType.ADMIN}
                    }
                });

                if (usersRetrieved) {
                    usersRetrieved.forEach(user => {
                        if(user.image) {
                            let imgBase64 = Buffer.from(user.image).toString('base64');
                            user.image = `data:image/png;base64,${imgBase64}`;
                        }
                    });
                    return usersRetrieved;
                } else {
                    throw exception.notFound(errorFactory([
                        'Any user found',
                        'Any user found'
                    ]));
                }
            } else {
                const userRetrieved = await userRepository.findOneUser({
                    where: {
                        email: query
                    },
                    attributes: { exclude: ['password'] }
                });

                console.log(userRetrieved);
    
                if (userRetrieved) {
                    return userRetrieved;
                } else {
                    throw exception.notFound(errorFactory([
                        `User not found with this email ${query}`,
                        `User not found with this email ${query}`
                    ]));
                }
            }
        } catch (error) {
            console.log('getUser - queryType:', query, ' - [Error]: ', error);
            throw error;
        }
    }
});
