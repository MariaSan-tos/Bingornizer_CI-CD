'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
     await queryInterface.bulkInsert('users', [{
      username: "Getulio",
      email: "getuliofurtado03@gmail.com",
      password: "032023"
    },{
      username: "Nicolas",
      email:"nicolas.03@gmail.com",
      password:"12345"
    }], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('users', null, {});
  }
};
