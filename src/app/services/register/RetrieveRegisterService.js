const errorFactory = require('../../../domain/error/ErrorFactory');

module.exports = ({ registerRepository, exception }) => ({
    execute: async (query) => {
        const { date } = query;
        try {

            const registersRetrieved = await registerRepository.findAllRegister({
                where: {
                    date: date
                }
            });

            if (registersRetrieved) {
                registersRetrieved.forEach(register => {
                    if (register.image) {
                        let imgBase64 = Buffer.from(register.image).toString('base64');
                        register.image = `data:image/png;base64,${imgBase64}`;
                    }
                });
                return registersRetrieved;
            } else {
                throw exception.notFound(errorFactory([
                    'Any register found',
                    'Any register found'
                ]));
            }

        } catch (error) {
            console.log('getRegister - date:', query, ' - [Error]: ', error);
            throw error;
        }
    }
});