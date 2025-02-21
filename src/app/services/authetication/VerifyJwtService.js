const jwt = require("jsonwebtoken");
const errorFactory = require('../../../domain/error/ErrorFactory');

const { ACCESS_TOKEN_SECRET } = process.env;

module.exports = ({ exception }) => ({
    execute: async (token) => {
        jwt.verify(token, ACCESS_TOKEN_SECRET, function (err, decoded) {
            if (err){
                throw exception.unauthorized(errorFactory([
                    'Token not valid',
                    'Token not valid'
                ]));
            }
           
        })
    }
});
