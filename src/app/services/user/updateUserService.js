const errorFactory = require('../../../domain/error/ErrorFactory');

module.exports = ({ userRepository, exception }) => ({
    execute: async (body, user_id) => {
        console.log('updateUser - user_id: ', user_id);
        try {
            const query = {
                where: {
                    user_id: user_id
                }
            };
            const user = await userRepository.findOneUser(query);

            if (!user) {
                throw exception.notFound(errorFactory([
                    `User not found with this user_id ${user_id}`,
                    `User not found with this user_id ${user_id}`
                ]));
            }

            const formattedBody = { ...user, ...body };

            await userRepository.updateUser(formattedBody, query);
            const updatedUser = await userRepository.findOneUser(query);
            return updatedUser;

        } catch (error) {
            console.log('updateUser - user_id:', user_id, ' - [Error]: ', error);
            throw error;
        }
    }
});
