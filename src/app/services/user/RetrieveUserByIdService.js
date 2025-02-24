const errorFactory = require('../../../domain/error/ErrorFactory');

module.exports = ({ userRepository, exception }) => ({
    execute: async (user_id) => {
        try {

        const userRetrieved = await userRepository.findOneUser({
            where: {
                user_id: user_id
            }
        });

        if (userRetrieved) {
            if(userRetrieved?.image){
                let imgBase64 = Buffer.from(userRetrieved?.image).toString('base64');
                userRetrieved.image = `data:image/png;base64,${imgBase64}`;
            }
            return userRetrieved;
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