const { where } = require('sequelize');
const {event} = require('../models');
const {Router} = require('express');
const methodOverride = require('method-override');

const roteador = Router();
roteador.use(methodOverride('_method'));

roteador.get('/', async (req, res) => {
    try {
        const user = req.session.user;
        const existingEvents = await event.findAll({
            where: {
                idUser: user.id
            }
        });
        res.render('homeUser', { existingEvents });
    } catch (error) {
        console.error(error);
        res.status(500).send('<h1>Erro interno do servidor</h1>');
    }
});

// UPDATE: atualizar um usuário
roteador.patch('/', async (req, res) => {
    const {idEvent} = req.query;
    const {description, date} = req.body;
    try {
        const existingEvent = await event.findOne({
            where: {id: idEvent}
        });

        if (!existingEvent) {
            res.send('<h1>Usuário não encontrado</h1>');
        } else {
            await event.update({description, date},{
                where: {id: idEvent}
            });
            const user = req.session.user;
            existingEvents = await event.findAll({
                where: {
                    idUser: user.id
                }
            });    
            res.render('homeUser', {existingEvent});
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('<h1>Erro interno do servidor</h1>');
    }
});

// DELETE: deletar um usuário
roteador.delete('/', async (req, res) => {
    const {idEvent} = req.query;
    try {
        const existingEvent = await event.findOne({
            where: {id: idEvent}
        });

        if (!existingEvent) {
            res.send('<h1>Usuário não encontrado</h1>');
        } else {
            await event.destroy({
                where: {id: idEvent}
            });
            const user = req.session.user;
            existingEvents = await event.findAll({
                where: {
                    idUser: user.id
                }
            });    
            res.render('homeUser', {existingEvent});
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('<h1>Erro interno do servidor</h1>');
    }
});

roteador.get('/newEvent', (req, res) => {
    res.render('newEvent')
})

roteador.post('/', async (req, res) => {
    const {date, description} = req.body;
    try {
        const user = req.session.user;
        await event.create({idUser: user.id, date: date, description: description});
        const existingEvents = await event.findAll({
            where: {
                idUser: user.id
            }
        });     
        res.render('homeUser', {existingEvents});
    } catch (error) {
        console.error(error);
        res.status(500).send('<h1>Erro interno do servidor</h1>');
    }
});

roteador.get('/editEvent', async (req, res) => {
    const idEvent = req.query;

    const existingEvents = await event.findOne({
        where:{
            id: idEvent.idEvent
        }
    })
    // res.send(existingEvents)
    res.render('editEvent', {existingEvents})
})

module.exports = roteador;
