// const {Sequelize, DataTypes} = require("Sequelize")

const user = (Sequelize, DataTypes) =>{
    return Sequelize.define('user', {
        username: DataTypes.STRING,
        password: DataTypes.STRING,
        email: DataTypes.STRING,
    });
}

module.exports = user;