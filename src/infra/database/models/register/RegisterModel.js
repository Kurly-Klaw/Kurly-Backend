const EnumRegisterStatus = require('../../../../domain/enum/EnumRegisterStatus');

module.exports = (sequelize, DataTypes) => {
    const Register = sequelize.define("register", {
        register_id: {
            type: DataTypes.UUID,
            allowNull: false,
            unique: true
        },
        user_id: {
            type: DataTypes.UUID,
            allowNull: false
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        treatment: {
            type: DataTypes.STRING,
            allowNull: false
        },
        value: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        total_value: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        date: {
            type: DataTypes.DATEONLY,
            allowNull: false
        },
        status: {
            type: DataTypes.ENUM(EnumRegisterStatus.values()),
            allowNull: false
        },
        additions: {
            type: DataTypes.ARRAY(
                DataTypes.JSON({ 
                addition: {
                    type: DataTypes.STRING,
                    allowNull: false
                },
                value: {
                    type: DataTypes.INTEGER,
                    allowNull: false
                }
            })) 
        },
        schedule: {
            type: DataTypes.JSON({ 
                start_hour: {
                    type: DataTypes.STRING,
                    allowNull: false
                },
                end_hour: {
                    type: DataTypes.STRING,
                    allowNull: false
                }
            })  
        },
        phone_number: {
            type: DataTypes.STRING,
            allowNull: false
        },
        image: {
            type: DataTypes.BLOB,
            allowNull: true
        },
    }, { timestamps: true },)
    return Register;
};