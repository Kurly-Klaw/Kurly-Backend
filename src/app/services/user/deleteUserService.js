const { deleteUser, findOneUser } = require("../../../infra/database/repository/userRepository");

const destroyUser = async (email, res) => { 
    try {
        
        const query = {
            where: { email: email }
        }

        const user = await findOneUser(query);

        if (!user) {
            return res.status(409).send("Requested " + email + " wasn't found!");
        } else {
            await deleteUser(user);
            return res.status(200).send("OK");
        }
    } catch (error) {
        console.log('deleteUser - email:', email, ' - [Error]: ', error)
    }
}


module.exports = {
    destroyUser
};