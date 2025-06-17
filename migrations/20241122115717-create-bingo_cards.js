'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('bingo_cards', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
      },
      idEvent: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      position_1: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      position_2: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      position_3: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      position_4: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      position_5: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      position_6: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      position_7: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      position_8: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      position_9: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      position_10: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      position_11: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      position_12: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      position_14: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      position_15: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      position_16: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      position_17: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      position_18: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      position_19: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      position_20: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      position_21: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      position_22: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      position_23: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      position_24: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      position_25: {
        type: Sequelize.INTEGER,
        allowNull: false
      }
    });
  },

  async down(queryInterface, Sequelize) {
     await queryInterface.dropTable('bingo_cards');
  }
};
