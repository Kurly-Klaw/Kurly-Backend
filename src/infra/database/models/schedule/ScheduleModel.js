module.exports = (sequelize, DataTypes) => {
    const Schedule = sequelize.define("schedule", {
        date: {
            type: DataTypes.DATEONLY,
            allowNull: false
        },
        schedules: {
            type: DataTypes.ARRAY(
                DataTypes.JSON({
                start_hour: {
                    type: DataTypes.STRING,
                    allowNull: false
                },
                end_hour: {
                    type: DataTypes.STRING,
                    allowNull: false
                },
                is_scheduled: {
                    type: DataTypes.BOOLEAN,
                    allowNull: false
                }
            })),   
        }
    }, { timestamps: true },)
    return Schedule;
};