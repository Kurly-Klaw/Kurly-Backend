const {v4:uuidv4} = require('uuid');
const EnumRegisterStatus = require('../../../domain/enum/EnumRegisterStatus');

module.exports = ({ registerRepository }) => ({
    execute: async (body, user_id) => {
        try {
            body.register_id = uuidv4();
            body.user_id = user_id;
            body.status = EnumRegisterStatus.SCHEDULED;
            let total_value = body.value;

            body.additions.forEach((element) =>{
                total_value = total_value+element.value;
            });

            body.total_value = total_value;

            const createdRegister = await registerRepository.createRegister(body);
          
            return createdRegister;
        } catch (error) {
            console.log('create register - [Error]: ', error);
            throw error;
        }
    }
});
