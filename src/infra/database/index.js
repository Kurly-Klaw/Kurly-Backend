require('dotenv').config();

const { DB_HOST, DB_USERNAME, DB_PASSWORD, DB_DATABASE, DB_DAILECT, DB_PORT } = process.env;
const { Sequelize, DataTypes } = require('sequelize')

const sequelize = new Sequelize({
    host: DB_HOST,
    username: DB_USERNAME,
    password: DB_PASSWORD,
    database: DB_DATABASE,
    dialect: DB_DAILECT,
    port: DB_PORT
})

sequelize.authenticate().then(() => {
    console.log(`Connection has been established successfully.`)
}).catch((err) => {
    console.log('Unable to connect to the database:', err)
})

const db = {}
db.Sequelize = Sequelize
db.sequelize = sequelize

//connecting to model
db.users = require('./models/user/UserModel') (sequelize, DataTypes)
db.schedules = require('./models/schedule/ScheduleModel') (sequelize, DataTypes)
db.registers = require('./models/register/RegisterModel') (sequelize, DataTypes)

//exporting the module
module.exports = db;