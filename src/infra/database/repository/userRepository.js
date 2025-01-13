const db = require("../models/user/index");

const User = db.users;

const findOneUser = async (query) => {
    try {
        const userFound = await User.findOne(query);
        return userFound;
    } catch (error) {
        console.log('Database error: ', error);
    }
}


const createUser = async (data) => {
    try {
        const userCreated = await User.create(data);
        return userCreated;
    } catch (error) {
        console.log('Database error: ', error);
    }
}


const findAllUser = async (query) => {
    try {
        const userList = await User.findAll(query);
        return userList;
    } catch (error) {
        console.log('Database error: ', error);
    }
}

const updateUser = async (data, query) => {
    try {
        const updatedUser = await User.update(data,query);
        return updatedUser;
    } catch (error) {
        console.log('Database error: ', error);
    }
}

const deleteUser = async (user) => {
    try {
        await user.destroy();
    } catch (error) {
        console.log('Database error: ', error);
    }
}


module.exports = {
    findOneUser,
    createUser,
    findAllUser,
    updateUser,
    deleteUser
};