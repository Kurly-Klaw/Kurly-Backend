const errorFactory = require('../../../domain/error/ErrorFactory');

module.exports = ({ userRepository, exception }) => ({
    execute: async (body) => {
        try {
            const queryEmail = {
                where: {
                    email: body.email,
                },
            };
            
            const emailcheck = await userRepository.findOneUser(queryEmail);
            if (emailcheck) {
                throw exception.forbidden(errorFactory([
                    `Email is duplicate ${body.email}`,
                    `Email is duplicate ${body.email}`
                ]));
            }
            
        } catch (error) {
            console.log('signup - [Error]: ', error);
            throw error;
        }
    }
});
