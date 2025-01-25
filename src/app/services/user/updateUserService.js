const errorFactory = require('../../../domain/error/ErrorFactory');

module.exports = ({ userRepository, exception }) => ({
    execute: async (body,requestedEmail) => {
        console.log('updateUser - updateItem: ', requestedEmail);
        try {
            const query = {
                where: {
                    email: requestedEmail
                }
            };
            const user = await userRepository.findOneUser(query);
            if (!user) {
                throw exception.notFound(errorFactory([
                    `User not found with this email ${requestedEmail}`,
                    `User not found with this email ${requestedEmail}`
                ]));
            }

            const updatedBody = await userRepository.updateUser(body, query);
            //const updatedUser = await findOneUser(query);
            return updatedBody;

        } catch (error) {
            console.log('updateUser - updateItem:', updateItem, ' - [Error]: ', error);
            throw error;
        }
    }
});
