const jwt = require("jsonwebtoken");
const { v4: uuidv4 } = require('uuid');

const { REFRESH_TOKEN_SECRET, REFRESH_TOKEN_EXPIRY } = process.env;

module.exports = ({ userRepository }) => ({
    execute: async (body, res) => {
        try {
            body.user_id = uuidv4();

            const createdUser = await userRepository.createUser(body);

            if (createdUser) {
                let token = jwt.sign(
                    {
                        name: createdUser.username, password: createdUser.password, email: createdUser.email, role: createdUser.role,
                        user_id: createdUser.user_id
                    },
                    REFRESH_TOKEN_SECRET,
                    { expiresIn: REFRESH_TOKEN_EXPIRY }
                );

                res.cookie("jwt", token, { maxAge: 1 * 24 * 60 * 60, httpOnly: true });


                console.log("user", JSON.stringify(createdUser, null, 2));
                console.log(token);

                return createdUser;
            }
        } catch (error) {
            console.log('createUser - [Error]: ', error);
            throw error;
        }
    }
});
