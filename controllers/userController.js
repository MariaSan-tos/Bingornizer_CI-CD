const {user, event} = require('../models');
const {Router} = require('express');
const { where } = require('sequelize');
const methodOverride = require('method-override');

const roteador = Router();

roteador.use(methodOverride('_method'));
// CRUD - Create, Read, Update, Delete

// READ: listar todos os usuários
roteador.get('/', async (req, res) => {
    try {
        const users = await user.findAll();
        res.send(users);
    } catch (error) {
        console.error(error);
        res.status(500).send('<h1>Erro interno do servidor</h1>');
    }
});

// CREATE: criar um novo usuário
roteador.post('/', async (req, res) => {
    const { username, email, password } = req.body;

    try {
        const existingUser = await user.findOne({
            where: {
                email: email,
                password: password
            }
        });

        if (existingUser) {
            alert("Já existe um usuário com esse email")
        } else {
            await user.create({ username, password, email });
            res.redirect("login")
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('<h1>Erro interno do servidor</h1>');
    }
});

// UPDATE: atualizar um usuário
roteador.patch('/', async (req, res) => {
    const existingUser = req.session.user;
    const {username, email, password} = req.body;
    try {
        if (!existingUser) {
            res.send('<h1>Usuário não encontrado</h1>');
        } else {
            await user.update({username, email, password}, {
                where: {id: existingUser.id}
            });
            const existingEvents = await event.findAll({
                where: {
                    idUser: existingUser.id
                }
            });
            const newUser = await user.findOne({
                where: {
                    id: existingUser.id
                }
            })
            req.session.user = newUser
            res.render('homeUser', {existingEvents});
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('<h1>Erro interno do servidor</h1>');
    }
});

// DELETE: deletar um usuário
roteador.delete('/', async (req, res) => {
    const existingUser = req.session.user;
    try {
        if (!existingUser) {
            res.send('<h1>Usuário não encontrado</h1>');
        } else {
            await user.destroy({
                where: {id: existingUser.id}
            });
            req.session.user = null;
            res.render('homePage');
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('<h1>Erro interno do servidor</h1>');
    }
});

roteador.get('/login', (req, res) => {
    res.render('login')
})

roteador.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const existingUser = await user.findOne({
            where: {
                email: email,
                password: password
            }
        });

        if (existingUser) {
            const existingEvents = await event.findAll({
                where: {
                    idUser: existingUser.id
                }
            });            

            req.session.user = existingUser;

            res.render('homeUser', {existingEvents})
        } else {
            res.send('usuario inexistente');
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('<h1>Erro interno do servidor</h1>');
    }
})

roteador.get('/cadastro', (req, res) => {
    res.render('cadastro')
})

roteador.get('/editUser', (req, res) => {
    const existingUser = req.session.user;
    res.render('editUser', {existingUser})
})

module.exports = roteador;
