const { createUser } = require("../../../infra/database/repository/userRepository");
const jwt = require("jsonwebtoken");

const { REFRESH_TOKEN_SECRET, REFRESH_TOKEN_EXPIRY } = process.env;

const saveUser = async (body, res) => {
    try {
        const { userName, email, password, role } = body;

        const data = {
            userName,
            email,
            password,
            role
        };

        const user = await createUser(data);

        if (user) {
            let token = jwt.sign(
                { name: user.username, password: user.password, email: user.email, role: user.role },
                REFRESH_TOKEN_SECRET,
                { expiresIn: REFRESH_TOKEN_EXPIRY }
            );

            res.cookie("jwt", token, { maxAge: 1 * 24 * 60 * 60, httpOnly: true });

            console.log("user", JSON.stringify(user, null, 2));
            console.log(token);

            return res.status(200).send(user);
        } else {
            return res.status(400).send("Invalid request body");
        }
    } catch (error) {
        console.log('signup - [Error]: ', error);
    }
}

module.exports = {
    saveUser
};