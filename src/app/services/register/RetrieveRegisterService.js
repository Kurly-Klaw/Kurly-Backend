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
            return registersRetrieved;
        } else {
            throw exception.notFound(errorFactory([
                'Any register found',
                'Any register found'
            ]));
        }

    } catch(error) {
        console.log('getRegister - date:', query, ' - [Error]: ', error);
        throw error;
    }
}
});