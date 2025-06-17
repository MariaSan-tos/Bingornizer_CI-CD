
const { event } = require('../models');

async function handleEventCreation(req, res) {
    const { date, description } = req.body;
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (!description || description.trim() === '') {
        return res.status(400).send('A descrição deve estar preenchida!');
    }
    if (!date || new Date(date) < today) {
        return res.status(400).send('O seu evento deve ocorrer hoje ou em uma data futura');
    }

    try {
        const user = req.session.user;
        await event.create({ idUser: user.id, date, description });
        const existingEvents = await event.findAll({ where: { idUser: user.id } });
        res.render('homeUser', { existingEvents });
    } catch (error) {
        res.status(500).send('<h1>Erro interno do servidor</h1>');
    }
}

jest.mock('../models');

// == Testes para a História de Usuário H3: Gerenciamento de Eventos
describe('H3: Lógica de Criação de Evento', () => {
    test('H3C1 (Falha): Deve retornar erro ao tentar criar evento com data no passado', async () => {
        const req = { body: { description: 'Festa Antiga', date: '2020-01-01' }, session: { user: { id: 1 } } };
        const res = { status: jest.fn().mockReturnThis(), send: jest.fn() };
        await handleEventCreation(req, res);
        expect(event.create).not.toHaveBeenCalled();
        expect(res.send).toHaveBeenCalledWith('O seu evento deve ocorrer hoje ou em uma data futura');
    });

    test('H3C1 (Falha): Deve retornar erro ao tentar criar evento com descrição vazia', async () => {
        const req = { body: { description: ' ', date: '2025-12-31' }, session: { user: { id: 1 } } };
        const res = { status: jest.fn().mockReturnThis(), send: jest.fn() };
        await handleEventCreation(req, res);
        expect(event.create).not.toHaveBeenCalled();
        expect(res.send).toHaveBeenCalledWith('A descrição deve estar preenchida!');
    });

    test('H3C1 (Sucesso): Deve criar um evento com sucesso com dados válidos', async () => {
        const req = { body: { description: 'Festa do Futuro', date: '2025-12-31' }, session: { user: { id: 1 } } };
        const res = { render: jest.fn() };
        event.findAll.mockResolvedValue([]);
        await handleEventCreation(req, res);
        expect(event.create).toHaveBeenCalledTimes(1);
    });
});