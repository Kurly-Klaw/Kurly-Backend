const EnumUserType = require('../../../../domain/enum/EnumUserType');

module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define("user", {
        user_id: {
            type: DataTypes.UUID,
            allowNull: false,
            unique: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        phone_number: {
            type: DataTypes.STRING,
            allowNull: false
        },
        imagem: {
            type: DataTypes.BLOB
        },
        email: {
            type: DataTypes.STRING,
            unique: true,
            isEmail: true,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        role: {
            type: DataTypes.ENUM(EnumUserType.values()),
            allowNull: false
        },
        hair_problems: {
            type: DataTypes.ARRAY(DataTypes.STRING())
        },
        hair_routine: {
            type: DataTypes.STRING
        },
        hair_size: {
            type: DataTypes.STRING
        },
        hair_type: {
            type: DataTypes.STRING
        },
        current_schedule: {
            type: DataTypes.ARRAY(
                DataTypes.JSON({
                    register_id: {
                        type: DataTypes.STRING,
                        allowNull: false
                    },
                    treatment: {
                        type: DataTypes.STRING,
                        allowNull: false
                    },
                    date: {
                        type: DataTypes.DATEONLY,
                        allowNull: false
                    },
                    total_value: {
                        type: DataTypes.INTEGER,
                        allowNull: false
                    },
                    status: {
                        type: DataTypes.STRING,
                        allowNull: false
                    }
                }))
        },
        history: {
            type: DataTypes.ARRAY(
                DataTypes.JSON({
                    date: {
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
                    status: {
                        type: DataTypes.STRING,
                        allowNull: false
                    }
                }))
        }
    }, { timestamps: true },)
    return User
};