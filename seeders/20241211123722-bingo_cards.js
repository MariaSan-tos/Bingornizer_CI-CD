'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('bingo_cards', [{
      idEvent: 1,
      position_1: 1,
        position_2: 2,
        position_3: 3,
        position_4: 4,
        position_5: 5,
        position_6: 6,
        position_7: 7,
        position_8: 8,
        position_9: 9,
        position_10: 10,
        position_11: 11,
        position_12: 12,
        position_14: 13,
        position_15: 14,
        position_16: 15,
        position_17: 16,
        position_18: 17,
        position_19: 18,
        position_20: 19,
        position_21: 20,
        position_22: 21,
        position_23: 22,
        position_24: 23,
        position_25: 24
    },{
      idEvent: 2,
      position_1: 1,
        position_2: 2,
        position_3: 3,
        position_4: 4,
        position_5: 5,
        position_6: 6,
        position_7: 7,
        position_8: 8,
        position_9: 9,
        position_10: 10,
        position_11: 11,
        position_12: 12,
        position_14: 13,
        position_15: 14,
        position_16: 15,
        position_17: 16,
        position_18: 17,
        position_19: 18,
        position_20: 19,
        position_21: 20,
        position_22: 21,
        position_23: 22,
        position_24: 23,
        position_25: 24
    }], {});

  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('bingo_cards', null, {});
  }
};
