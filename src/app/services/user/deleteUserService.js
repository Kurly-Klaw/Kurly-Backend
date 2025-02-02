const errorFactory = require('../../../domain/error/ErrorFactory');

module.exports = ({ userRepository, exception }) => ({
    execute: async (user_id) => {
        try {
            const query = {
                where: { user_id: user_id }
            };
            const user = await userRepository.findOneUser(query);

            if (!user) {
                throw exception.notFound(errorFactory([
                    `User not found with this user_id ${user_id}`,
                    `User not found with this user_id ${user_id}`
                ]));
            } else {
                await userRepository.deleteUser(user);
            }
        } catch (error) {
            console.log('deleteUser - user_id:', user_id, ' - [Error]: ', error);
            throw error;
        }
    }
});