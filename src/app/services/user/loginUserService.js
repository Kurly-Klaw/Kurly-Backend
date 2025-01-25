const jwt = require("jsonwebtoken");
const errorFactory = require('../../../domain/error/ErrorFactory');

const { ACCESS_TOKEN_SECRET, ACCESS_TOKEN_EXPIRY, REFRESH_TOKEN_SECRET, REFRESH_TOKEN_EXPIRY } = process.env;

module.exports = ({ userRepository, exception }) => ({
    execute: async (body) => {
        try {
            const { email, password } = body;

            const user = await userRepository.findOneUser({ where: { email: email } });

            if (user) {
                const isSame = password === user.password ? true : false;

                if (isSame) {
                    const accessToken = jwt.sign(
                        { userName: user.userName, email: user.email, role: user.role },
                        ACCESS_TOKEN_SECRET,
                        { expiresIn: ACCESS_TOKEN_EXPIRY }
                    );

                    const refreshToken = jwt.sign(
                        { userName: user.userName, email: user.email, role: user.role },
                        REFRESH_TOKEN_SECRET,
                        { expiresIn: REFRESH_TOKEN_EXPIRY }
                    );

                    const longinBody = {
                        token: accessToken,
                        refreshToken: refreshToken
                    };
                    return longinBody;
                } else {
                    throw exception.unauthorized(errorFactory([
                        'Incorrect Password',
                        'Incorrect Password'
                    ]));
                }
            } else {
                throw exception.notFound(errorFactory([
                    'User not found',
                    'User not found'
                ]));
            }
        } catch (error) {
            console.log('login - [Error]: ', error);
            throw error;
        }
    }
});
