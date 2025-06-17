module.exports = (sequelize, DataTypes) => {
    const bingo_card = sequelize.define('bingo_card', {
        idEvent: DataTypes.INTEGER,
        position_1: DataTypes.INTEGER,
        position_2: DataTypes.INTEGER,
        position_3: DataTypes.INTEGER,
        position_4: DataTypes.INTEGER,
        position_5: DataTypes.INTEGER,
        position_6: DataTypes.INTEGER,
        position_7: DataTypes.INTEGER,
        position_8: DataTypes.INTEGER,
        position_9: DataTypes.INTEGER,
        position_10: DataTypes.INTEGER,
        position_11: DataTypes.INTEGER,
        position_12: DataTypes.INTEGER,
        position_14: DataTypes.INTEGER,
        position_15: DataTypes.INTEGER,
        position_16: DataTypes.INTEGER,
        position_17: DataTypes.INTEGER,
        position_18: DataTypes.INTEGER,
        position_19: DataTypes.INTEGER,
        position_20: DataTypes.INTEGER,
        position_21: DataTypes.INTEGER,
        position_22: DataTypes.INTEGER,
        position_23: DataTypes.INTEGER,
        position_24: DataTypes.INTEGER,
        position_25: DataTypes.INTEGER,
    }, { timestamps: false });

    bingo_card.associate = (models) => {
        bingo_card.belongsTo(models.event, { foreignKey: 'idEvent' });
    };

    return bingo_card;
};
