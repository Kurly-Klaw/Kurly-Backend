const db = require("../index");
const Registers = db.registers;

class RegisterRepository {
    constructor() { }

    async findOneRegister(query) {
        try {
            const registersFound = await Registers.findOne(query);
            return registersFound;
        } catch (error) {
            console.log('Database error: ', error);
        }
    }
    async createRegister(data) {
        try {
            const registersCreated = await Registers.create(data);
            return registersCreated;
        } catch (error) {
            console.log('Database error: ', error);
        }
    }
    async findAllRegister(query) {
        try {
            const registersList = await Registers.findAll(query);
            return registersList;
        } catch (error) {
            console.log('Database error: ', error);
        }
    }
    async updateRegister(data, query) {
        try {
            const updatedRegisters = await Registers.update(data, query);
            return updatedRegisters;
        } catch (error) {
            console.log('Database error: ', error);
        }
    }
    async deleteRegister(Registers) {
        try {
            await Registers.destroy();
        } catch (error) {
            console.log('Database error: ', error);
        }
    }
}

module.exports = RegisterRepository;