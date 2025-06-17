const { DataTypes, Sequelize } =  require("sequelize");

module.exports = (Sequelize, DataTypes) => {
    const event = Sequelize.define('event', {
        idUser: DataTypes.INTEGER,
        date: DataTypes.DATE,
        description: DataTypes.TEXT
    }, {});
    event.associate = function (models) {
        event.belongsTo(models.user, { foreignKey: 'idUser' })
    };
    return event;
};