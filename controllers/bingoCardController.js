const { where } = require('sequelize');
const { bingo_card, event } = require('../models');
const {Router} = require('express');
const methodOverride = require('method-override');

const roteador = Router();

roteador.use(methodOverride('_method'));

roteador.get('/newBingoCard', (req, res) => {
    const idEvent = req.query;
    res.render('newBingoCard', {...idEvent})
})

roteador.get('/editBingoCard', async (req, res) => {
    const bingoId = req.query;
    const existingBingoCards = await bingo_card.findOne({
        where: {id: bingoId.bingoId}
    })
    // res.send(bingoId.bingoId)
    res.render('editBingoCard', {existingBingoCards})
})

roteador.get('/', async (req, res) => {
    const idEvent = req.query.idEvent;
    const existingBingoCards = await bingo_card.findAll({
        where:{
            idEvent: idEvent
        }
    })
    res.render('homeBingoCard', {existingBingoCards})
    // res.send(existingBingoCards)
})

roteador.post('/', async (req, res) => {
    const idEvent = req.query.idEvent;

    const {
        position_1,
        position_2,
        position_3,
        position_4,
        position_5,
        position_6,
        position_7,
        position_8,
        position_9,
        position_10,
        position_11,
        position_12,
        position_14,
        position_15,
        position_16,
        position_17,
        position_18,
        position_19,
        position_20,
        position_21,
        position_22,
        position_23,
        position_24,
        position_25
    } = req.body;

    try {
        await bingo_card.create({ idEvent: idEvent,
            position_1,
            position_2,
            position_3,
            position_4,
            position_5,
            position_6,
            position_7,
            position_8,
            position_9,
            position_10,
            position_11,
            position_12,
            position_14,
            position_15,
            position_16,
            position_17,
            position_18,
            position_19,
            position_20,
            position_21,
            position_22,
            position_23,
            position_24,
            position_25
        });

        // Redireciona para a página de eventos após o sucesso.
        res.redirect('/event');

    } catch (error) {
        console.error(error);
        res.status(500).send('<h1>Erro interno do servidor</h1>');
    }
})

roteador.patch('/', async (req, res) => {
    const bingoId = req.query;
    const {position_1,
        position_2,
        position_3,
        position_4,
        position_5,
        position_6,
        position_7,
        position_8,
        position_9,
        position_10,
        position_11,
        position_12,
        position_14,
        position_15,
        position_16,
        position_17,
        position_18,
        position_19,
        position_20,
        position_21,
        position_22,
        position_23,
        position_24,
        position_25} = req.body;
    try {
            await bingo_card.update({position_1,
                position_2,
                position_3,
                position_4,
                position_5,
                position_6,
                position_7,
                position_8,
                position_9,
                position_10,
                position_11,
                position_12,
                position_14,
                position_15,
                position_16,
                position_17,
                position_18,
                position_19,
                position_20,
                position_21,
                position_22,
                position_23,
                position_24,
                position_25}, {
                where: {id: bingoId.bingoId}
            });
            const existingUser = req.session.user;

            const existingEvents = await event.findAll({
                where: {
                    idUser: existingUser.id
                }
            });
            res.render('homeUser', {existingEvents});
    } catch (error) {
        console.error(error);
        res.status(500).send('<h1>Erro interno do servidor</h1>');
    }
});

// DELETE: deletar um usuário
roteador.delete('/', async (req, res) => {
    const {bingoId, idEvent} = req.query;
    try {
        await bingo_card.destroy({
            where: {id: bingoId}
        });

        res.redirect(`/bingoCard?idEvent=${idEvent}`);
    } catch (error) {
        console.error(error);
        res.status(500).send('<h1>Erro interno do servidor</h1>');
    }
});

module.exports = roteador;
