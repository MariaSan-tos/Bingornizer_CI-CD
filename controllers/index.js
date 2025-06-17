const userController = require('./userController');
const eventController = require('./eventController');
const bingoCardController = require('./bingoCardController')

controllers = {
    userController: userController,
    eventController: eventController,
    bingoCardController: bingoCardController
}

module.exports = controllers;