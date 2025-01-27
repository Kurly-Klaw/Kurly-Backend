const db = require("../index");
const User = db.users;

class UserRepository {
    constructor() { }
    
    async findOneUser(query) {
        try {
            const userFound = await User.findOne(query);
            return userFound;
        } catch (error) {
            console.log('Database error: ', error);
        }
    }
    async createUser(data) {
        try {
            const userCreated = await User.create(data);
            return userCreated;
        } catch (error) {
            console.log('Database error: ', error);
        }
    }
    async findAllUser(query) {
        try {
            const userList = await User.findAll(query);
            return userList;
        } catch (error) {
            console.log('Database error: ', error);
        }
    }
    async updateUser(data, query) {
        try {
            const updatedUser = await User.update(data, query);
            return updatedUser;
        } catch (error) {
            console.log('Database error: ', error);
        }
    }
    async deleteUser(user) {
        try {
            await user.destroy();
        } catch (error) {
            console.log('Database error: ', error);
        }
    }
}

module.exports = UserRepository;