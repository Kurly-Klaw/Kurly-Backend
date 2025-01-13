const { saveUser } = require("../../../app/services/user/createUserService.js");
const { retrieveUser } = require("../../../app/services/user/retrieveUserService.js");
const { userUpdate } = require("../../../app/services/user/updateUserService.js");
const { destroyUser } = require("../../../app/services/user/deleteUserService.js");
const { loginUser } = require("../../../app/services/user/loginUserService.js");


const login = async (req, res) => { 
    return await loginUser(req.body,res) 
};

const signup = async (req, res) => {
    return await saveUser(req.body, res);
};

const getUser = async (req, res) => {
    return await retrieveUser(req.query.query, res);
};

const updateUser = async (req, res) => {
    return await userUpdate(req.body,eq.params.email,res);
}

const deleteUser = async (req, res) => {
    return await destroyUser(req.params.email,res)
}

module.exports = {
    login,
    signup,
    getUser,
    updateUser,
    deleteUser,
};