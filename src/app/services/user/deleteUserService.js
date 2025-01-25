const errorFactory = require('../../../domain/error/ErrorFactory');

module.exports = ({ userRepository, exception }) => ({
    execute: async (email) => {
        try {
            const query = {
                where: { email: email }
            };
            const user = await userRepository.findOneUser(query);

            if (!user) {
                throw exception.notFound(errorFactory([
                    `User not found with this email ${requestedEmail}`,
                    `User not found with this email ${requestedEmail}`
                ]));
            } else {
                await userRepository.deleteUser(user);
            }
        } catch (error) {
            console.log('deleteUser - email:', email, ' - [Error]: ', error);
            throw error;
        }
    }
});