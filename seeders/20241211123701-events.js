'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
     Example:
     await queryInterface.bulkInsert('events', [{
      idUser: 1,
      date: Sequelize.fn('NOW'),
      description: "Bingao do IF"
    },{
      idUser: 2,
      date: Sequelize.fn('NOW'),
      description: "Bingao do instituto"
    }], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('events', null, {});
  }
};
