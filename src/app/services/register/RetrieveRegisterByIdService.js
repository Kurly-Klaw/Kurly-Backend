const errorFactory = require('../../../domain/error/ErrorFactory');

module.exports = ({ registerRepository, exception }) => ({
    execute: async (register_id) => {
        try {
            const registerRetrieved = await registerRepository.findOneRegister({
                where: {
                    register_id: register_id
                }
            });

            if (registerRetrieved) {
                if (registerRetrieved?.image) {
                    let imgBase64 = Buffer.from(registerRetrieved?.image).toString('base64');
                    registerRetrieved.image = `data:image/png;base64,${imgBase64}`;
                }
                return registerRetrieved;
            } else {
                throw exception.notFound(errorFactory([
                    `Any register not found with the register_id ${register_id}`,
                    `Any register not found with the register_id ${register_id}`
                ]));
            }
        } catch (error) {
            console.log('getRegisterById - register_id:', register_id, ' - [Error]: ', error);
            throw error;
        }
    }
});