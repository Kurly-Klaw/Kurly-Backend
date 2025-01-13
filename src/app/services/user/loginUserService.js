const { findOneUser } = require("../../../infra/database/repository/userRepository");
const jwt = require("jsonwebtoken");

const { ACCESS_TOKEN_SECRET, ACCESS_TOKEN_EXPIRY, REFRESH_TOKEN_SECRET, REFRESH_TOKEN_EXPIRY } = process.env;

const loginUser = async (body, res) => {
    try {
        const { email, password } = body;

        const user = await findOneUser({ where: { email: email } });

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
                res.status(200).send({
                    token: accessToken,
                    refreshToken: refreshToken
                });
            } else {
                return res.status(401).send("Authentication failed");
            }
        } else {
            return res.status(401).send("Authentication failed");
        }
    } catch (error) {
        console.log('login - [Error]: ', error);
    }
}

module.exports = { loginUser }

