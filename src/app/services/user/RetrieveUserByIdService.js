const errorFactory = require('../../../domain/error/ErrorFactory');

module.exports = ({ userRepository, exception }) => ({
    execute: async (user_id) => {
        try {

        const registerRetrieved = await userRepository.findOneUser({
            where: {
                user_id: user_id
            }
        });

        if (registerRetrieved) {
            return registerRetrieved;
        } else {
            throw exception.notFound(errorFactory([
                `Any register not found with the user_id ${user_id}`,
                `Any register not found with the user_id ${user_id}`
            ]));
        }

    } catch(error) {
        console.log('getUserById - user_id:', user_id, ' - [Error]: ', error);
        throw error;
    }
}
});