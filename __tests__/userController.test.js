const { user, event } = require('../models');

// Lógica de H1
async function handleUserCreation(req, res) {
    const { username, email, password } = req.body;
    try {
        const existingUser = await user.findOne({ where: { email: email } });
        if (existingUser) {
            return res.status(409).send('E-mail já existe');
        }
        await user.create({ username, password, email });
        res.redirect("login");
    } catch (error) {
        res.status(500).send('<h1>Erro interno do servidor</h1>');
    }
}

// Lógica de H2
async function handleLogin(req, res) {
    const { email, password } = req.body;
    try {
        const existingUser = await user.findOne({ where: { email, password } });
        if (existingUser) {
            req.session.user = existingUser;
            const existingEvents = await event.findAll({ where: { idUser: existingUser.id } });
            res.render('homeUser', { existingEvents });
        } else {
            res.send('usuario inexistente');
        }
    } catch (error) {
        res.status(500).send('<h1>Erro interno do servidor</h1>');
    }
}

// Lógica de H5
async function handleUserUpdate(req, res) {
    const { username, email, password } = req.body;
    try {
        await user.update({ username, email, password }, { where: { id: req.session.user.id } });
        const updatedUser = await user.findOne({ where: { id: req.session.user.id } });
        req.session.user = updatedUser;
        const existingEvents = await event.findAll({ where: { idUser: req.session.user.id } });
        res.render('homeUser', { existingEvents });
    } catch (error) {
        res.status(500).send('<h1>Erro interno do servidor</h1>');
    }
}

// Lógica de H5
async function handleUserDelete(req, res) {
    try {
        await user.destroy({ where: { id: req.session.user.id } });
        req.session.user = null;
        res.render('homePage');
    } catch (error) {
        res.status(500).send('<h1>Erro interno do servidor</h1>');
    }
}


jest.mock('../models');

// == Testes para a História de Usuário H1: Cadastro de Usuário
describe('H1: Lógica de Cadastro de Usuário', () => {
    test('H1C1: Deve criar um novo usuário com sucesso', async () => {
        const req = { body: { username: 'novo', email: 'novo@email.com', password: '123' } };
        const res = { redirect: jest.fn() };
        user.findOne.mockResolvedValue(null);
        await handleUserCreation(req, res);
        expect(user.create).toHaveBeenCalledWith(req.body);
        expect(res.redirect).toHaveBeenCalledWith('login');
    });

    test('H1C2: Não deve criar usuário com email existente', async () => {
        const req = { body: { username: 'antigo', email: 'existe@email.com', password: '123' } };
        const res = { status: jest.fn().mockReturnThis(), send: jest.fn() };
        user.findOne.mockResolvedValue({ id: 1 });
        await handleUserCreation(req, res);
        expect(user.create).not.toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(409);
    });
});


// == Testes para a História de Usuário H2: Login de Usuário
describe('H2: Lógica de Login', () => {
    let req;
    beforeEach(() => {
        req = { body: { email: 'teste@teste.com', password: '123' }, session: {} };
        event.findAll.mockResolvedValue([]); 
    });
    
    // Cenário H2C1: Login Bem-Sucedido
    test('H2C1: Deve logar o usuário e redirecionar para homeUser com credenciais válidas', async () => {
        const res = { render: jest.fn() };
        const mockUser = { id: 1, email: 'teste@teste.com' };
        user.findOne.mockResolvedValue(mockUser);
        
        await handleLogin(req, res);
        
        expect(user.findOne).toHaveBeenCalledWith({ where: req.body });
        expect(req.session.user).toEqual(mockUser);
        expect(res.render).toHaveBeenCalledWith('homeUser', { existingEvents: [] });
    });

    // Cenário H2C2: Login com Credenciais Inválidas
    test('H2C2: Deve exibir mensagem de erro com credenciais inválidas', async () => {
        const res = { send: jest.fn() };
        user.findOne.mockResolvedValue(null);
        
        await handleLogin(req, res);
        
        expect(res.send).toHaveBeenCalledWith('usuario inexistente');
    });
});


// == Testes para a História de Usuário H5: Gerenciamento de Perfil
describe('H5: Lógica de Gerenciamento de Perfil', () => {
    let req;
    beforeEach(() => {
        req = { session: { user: { id: 1 } } };
        user.findOne.mockResolvedValue({ id: 1 });
        event.findAll.mockResolvedValue([]);
    });

    // Cenário H5C1: Edição de Perfil de Usuário
    test('H5C1: Deve atualizar as informações do usuário no banco', async () => {
        req.body = { username: 'editado', email: 'editado@email.com', password: '456' };
        const res = { render: jest.fn() };
        
        await handleUserUpdate(req, res);
        
        expect(user.update).toHaveBeenCalledWith(req.body, { where: { id: 1 } });
        expect(res.render).toHaveBeenCalledWith('homeUser', { existingEvents: [] });
    });

    // Cenário H5C2: Exclusão de Perfil de Usuário
    test('H5C2: Deve remover o usuário do banco e limpar a sessão', async () => {
        const res = { render: jest.fn() };
        
        await handleUserDelete(req, res);
        
        expect(user.destroy).toHaveBeenCalledWith({ where: { id: 1 } });
        expect(req.session.user).toBeNull();
        expect(res.render).toHaveBeenCalledWith('homePage');
    });
});