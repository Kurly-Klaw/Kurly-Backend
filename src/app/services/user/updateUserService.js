const { findOneUser, updateUser } = require("../../../infra/database/repository/userRepository");

const userUpdate = async (body, requestedEmail, res) => {

    console.log('updateUser - updateItem: ', requestedEmail);

    const { userName, email, password, role } = body;

    try {
        const query = {
            where: {
                email: requestedEmail
            }
        };

        const user = await findOneUser(query);

        if (!user) {
            return res.status(409).send("Requested "+requestedEmail+" wasn't found!");
        }

        const checkSameUser = await User.findOne({
            where: {
                email: user.email
            }
        });
        
        if (checkSameUser && requestedEmail != user.email) {
            return res.status(403).send("Requested "+email+" is duplicate, please change and retry it.");
        }

        const updateBody = {
            userName: userName,
            email: email,
            password: password,
            role: role
        }
        await updateUser(updateBody,query);

        const updatedUser = await findOneUser(query);

        return res.status(200).send(updatedUser);

    } catch (error) {
        console.log('updateUser - updateItem:', updateItem, ' - [Error]: ', error)
    }
}

module.exports = { userUpdate }