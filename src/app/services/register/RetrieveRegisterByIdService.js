const errorFactory = require('../../../domain/error/ErrorFactory');

module.exports = ({ registerRepository, exception }) => ({
    execute: async (register_id) => {
        try {

        const registerRetrieved = await registerRepository.findAllRegister({
            where: {
                register_id: register_id
            }
        });

        if (registerRetrieved) {
            return registerRetrieved;
        } else {
            throw exception.notFound(errorFactory([
                `Any register not found with the register_id ${register_id}`,
                `Any register not found with the register_id ${register_id}`
            ]));
        }

    } catch(error) {
        console.log('getRegisterById - date:', query, ' - [Error]: ', error);
        throw error;
    }
}
});