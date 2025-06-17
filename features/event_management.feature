# language: pt

Funcionalidade: Gerenciamento de Eventos
  Como um organizador de eventos
  Eu quero criar, visualizar, editar e deletar eventos
  Para gerenciar os bingos que estou organizando

  Cenário: Criação de um Novo Evento com Data Futura
    Dado que estou logado como "Getulio" com a senha "032023" e na página homeUser
    Quando clico em "Novo Evento"
    E preencho a descrição "Bingo de Férias" e a data "30/07/2025"
    E clico em "Salvar"
    Então um novo evento com descrição "Bingo de Férias" e data "30/07/2025" deve ser criado associado ao meu usuário
    E eu devo ser redirecionado para a página homeUser com o novo evento listado

  Cenário: Criação de um Novo Evento com Data Atual
    Dado que estou logado como "Nicolas" com a senha "12345" e na página homeUser
    Quando clico em "Novo Evento"
    E preencho a descrição "Bingo Hoje" e a data do dia atual
    E clico em "Salvar"
    Então um novo evento com descrição "Bingo Hoje" e a data do dia atual deve ser criado associado ao meu usuário
    E eu devo ser redirecionado para a página homeUser com o novo evento listado

  Cenário: Tentativa de Criação de Evento com Data Passada
    Dado que estou logado como "Getulio" com a senha "032023" e na página homeUser
    Quando clico em "Novo Evento"
    E preencho a descrição "Evento Antigo" e a data "01/01/2024"
    E clico em "Salvar"
    Então o sistema deve exibir a mensagem "O seu evento deve ocorrer hoje ou em uma data futura"
    E o evento "Evento Antigo" não deve ser criado

  Cenário: Tentativa de Criação de Evento com Descrição Vazia
    Dado que estou logado como "Getulio" com a senha "032023" e na página homeUser
    Quando clico em "Novo Evento"
    E preencho a data "30/07/2025" deixando a descrição em branco
    E clico em "Salvar"
    Então o sistema deve impedir o registro
    E exibir uma validação HTML para o campo "descrição"

  Cenário: Edição de um Evento Existente - Alterar Descrição e Data
    Dado que estou logado como "Getulio" com a senha "032023" e na página homeUser com o evento "Bingao do IF" existente
    Quando clico em "Editar evento" para o evento "Bingao do IF"
    E modifico a descrição para "Bingao do IF - Edição" e a data para "01/08/2025"
    E clico em "Salvar"
    Então as informações do evento "Bingao do IF - Edição" devem ser atualizadas no banco de dados
    E eu devo ser redirecionado para a página homeUser com as informações atualizadas

  Cenário: Exclusão de um Evento
    Dado que estou logado como "Nicolas" com a senha "12345" e na página homeUser com o evento "Bingao do instituto" existente
    Quando clico em "Editar evento" para o evento "Bingao do instituto"
    E na página de edição, clico em "Deletar Evento"
    Então o evento "Bingao do instituto" deve ser removido do banco de dados
    E eu devo ser redirecionado para a página homeUser sem o evento excluído