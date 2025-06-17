const { bingo_card } = require('../models');

async function handleBingoCardCreation(req, res) {
    const numbers = Object.values(req.body);

    // Validação H4 - CE4: Todos os campos preenchidos
    if (numbers.length < 24 || numbers.some(n => n === null || n === '')) {
        return res.status(400).send('Todos os campos devem ser preenchidos');
    }

    // Validação H4 - CE6: Apenas números inteiros
    if (numbers.some(n => !/^\d+$/.test(n))) {
        return res.status(400).send('Apenas números inteiros são permitidos');
    }
    
    const intNumbers = numbers.map(n => parseInt(n, 10));
    
    // Validação H4 - CE8: Números dentro do intervalo
    if (intNumbers.some(n => n < 1 || n > 75)) {
        return res.status(400).send('Número fora do intervalo permitido');
    }
    
    // Validação H4 - CE10: Números únicos
    const uniqueNumbers = new Set(intNumbers);
    if (uniqueNumbers.size !== intNumbers.length) {
        return res.status(400).send('Os números da cartela devem ser únicos');
    }

    try {
        await bingo_card.create({ idEvent: req.query.idEvent, ...req.body });
        res.redirect('/event');
    } catch (error) {
        res.status(500).send('<h1>Erro interno do servidor</h1>');
    }
}


jest.mock('../models');

// == Testes para a História de Usuário H4: Gerenciamento de Cartelas
describe('H4: Lógica de Criação de Cartela de Bingo', () => {

    let baseReq;
    beforeEach(() => {
        // Uma cartela válida como base para os testes
        baseReq = {
            query: { idEvent: 1 },
            body: {
                position_1: '1', position_2: '2', position_3: '3', position_4: '4', position_5: '5',
                position_6: '6', position_7: '7', position_8: '8', position_9: '9', position_10: '10',
                position_11: '11', position_12: '12', position_14: '13', position_15: '14', position_16: '15',
                position_17: '16', position_18: '17', position_19: '18', position_20: '19', position_21: '20',
                position_22: '21', position_23: '22', position_24: '23', position_25: '24'
            }
        };
        jest.clearAllMocks();
    });

    // Cenário H4C1 - Sucesso
    test('Deve criar a cartela com dados válidos', async () => {
        const res = { redirect: jest.fn() };
        await handleBingoCardCreation(baseReq, res);
        expect(bingo_card.create).toHaveBeenCalled();
        expect(res.redirect).toHaveBeenCalledWith('/event');
    });

    // Cenário H4C1 - Falha (CE4)
    test('NÃO deve criar a cartela se um campo estiver vazio', async () => {
        baseReq.body.position_5 = ''; // Campo vazio
        const res = { status: jest.fn().mockReturnThis(), send: jest.fn() };
        await handleBingoCardCreation(baseReq, res);
        expect(bingo_card.create).not.toHaveBeenCalled();
        expect(res.send).toHaveBeenCalledWith('Todos os campos devem ser preenchidos');
    });

    // Cenário H4C1 - Falha (CE6)
    test('NÃO deve criar a cartela se um campo não for número', async () => {
        baseReq.body.position_10 = 'abc'; // Campo com texto
        const res = { status: jest.fn().mockReturnThis(), send: jest.fn() };
        await handleBingoCardCreation(baseReq, res);
        expect(bingo_card.create).not.toHaveBeenCalled();
        expect(res.send).toHaveBeenCalledWith('Apenas números inteiros são permitidos');
    });

    // Cenário H4C1 - Falha (CE8)
    test('NÃO deve criar a cartela com número fora do intervalo (menor que 1)', async () => {
        baseReq.body.position_15 = '0'; // Número inválido
        const res = { status: jest.fn().mockReturnThis(), send: jest.fn() };
        await handleBingoCardCreation(baseReq, res);
        expect(bingo_card.create).not.toHaveBeenCalled();
        expect(res.send).toHaveBeenCalledWith('Número fora do intervalo permitido');
    });

    // Cenário H4C1 - Falha (CE10)
    test('NÃO deve criar a cartela com números repetidos', async () => {
        baseReq.body.position_20 = '10'; // Repetindo o número da posição 10
        const res = { status: jest.fn().mockReturnThis(), send: jest.fn() };
        await handleBingoCardCreation(baseReq, res);
        expect(bingo_card.create).not.toHaveBeenCalled();
        expect(res.send).toHaveBeenCalledWith('Os números da cartela devem ser únicos');
    });
});