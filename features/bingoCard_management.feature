# language: pt

Funcionalidade: Gerenciamento de Cartelas de Bingo #H4
  Como um criador de cartelas
  Eu quero criar, visualizar, editar e deletar cartelas de bingo associadas a um evento
  Para preparar as cartelas para o bingo

  Cenário: Criação de uma Nova Cartela de Bingo com Números Válidos #H4C1
    Dado que estou logado como "Getulio" com a senha "032023" e na página homeUser com o evento "Bingao do IF" existente
    Quando clico em "Nova Cartela" para o evento "Bingao do IF"
    E preencho os 24 campos de posição da cartela com números inteiros únicos válidos entre 1 e 75
      | position_1  | 1  |
      | position_2  | 2  |
      | position_3  | 3  |
      | position_4  | 4  |
      | position_5  | 5  |
      | position_6  | 6  |
      | position_7  | 7  |
      | position_8  | 8  |
      | position_9  | 9  |
      | position_10 | 10 |
      | position_11 | 11 |
      | position_12 | 12 |
      | position_14 | 14 |
      | position_15 | 15 |
      | position_16 | 16 |
      | position_17 | 17 |
      | position_18 | 18 |
      | position_19 | 19 |
      | position_20 | 20 |
      | position_21 | 21 |
      | position_22 | 22 |
      | position_23 | 23 |
      | position_24 | 24 |
      | position_25 | 25 |
    E clico em "Salvar"
    Então uma nova cartela de bingo deve ser criada e associada ao evento "Bingao do IF"
    E eu devo ser redirecionado para a página homeUser

  Cenário: Tentativa de Criação de Cartela com Campo Vazio #H4C1
    Dado que estou logado como "Getulio" com a senha "032023" e na página homeUser com o evento "Bingao do IF" existente
    Quando clico em "Nova Cartela" para o evento "Bingao do IF"
    E preencho 23 campos de posição da cartela com números válidos e deixo um campo em branco
    E clico em "Salvar"
    Então o sistema deve exibir a mensagem "Todos os campos devem ser preenchidos"
    E a cartela não deve ser criada

  Cenário: Tentativa de Criação de Cartela com Campo Não Numérico #H4C1
    Dado que estou logado como "Getulio" com a senha "032023" e na página homeUser com o evento "Bingao do IF" existente
    Quando clico em "Nova Cartela" para o evento "Bingao do IF"
    E preencho um campo de posição da cartela com "abc" e os demais com números válidos
    E clico em "Salvar"
    Então o sistema deve exibir a mensagem "Apenas números inteiros são permitidos"
    E a cartela não deve ser criada

  Cenário: Tentativa de Criação de Cartela com Número Fora do Intervalo #H4C1
    Dado que estou logado como "Getulio" com a senha "032023" e na página homeUser com o evento "Bingao do IF" existente
    Quando clico em "Nova Cartela" para o evento "Bingao do IF"
    E preencho um campo de posição da cartela com "0" e os demais com números válidos
    E clico em "Salvar"
    Então o sistema deve exibir a mensagem "Número fora do intervalo permitido"
    E a cartela não deve ser criada

  Cenário: Tentativa de Criação de Cartela com Números Repetidos #H4C1
    Dado que estou logado como "Getulio" com a senha "032023" e na página homeUser com o evento "Bingao do IF" existente
    Quando clico em "Nova Cartela" para o evento "Bingao do IF"
    E preencho dois campos de posição da cartela com o mesmo número e os demais com números válidos
    E clico em "Salvar"
    Então o sistema deve exibir a mensagem "Os números da cartela devem ser únicos"
    E a cartela não deve ser criada

  Cenário: Visualização de Cartelas de Bingo de um Evento #H4C2
    Dado que estou logado como "Getulio" com a senha "032023" e na página homeUser com o evento "Bingao do IF" que possui cartelas
    Quando clico em "Ver Cartelas" para o evento "Bingao do IF"
    Então devo ser redirecionado para a página homeBingoCard
    E a página deve listar as cartelas de bingo associadas ao evento "Bingao do IF"

  Cenário: Visualização de Cartelas de Bingo de um Evento Sem Cartelas #H4C2
    Dado que estou logado como "Nicolas" com a senha "12345" e na página homeUser com o evento "Bingao do instituto" que não possui cartelas
    Quando clico em "Ver Cartelas" para o evento "Bingao do instituto"
    Então devo ser redirecionado para a página homeBingoCard
    E a página deve exibir a mensagem "Sem cartelas nesse evento"

  Cenário: Edição de uma Cartela de Bingo Existente #H4C3
    Dado que estou logado como "Getulio" com a senha "032023" e na página homeBingoCard com a cartela de ID "1" do evento "Bingao do IF" existente
    Quando clico em "Editar" para a cartela de ID "1"
    E modifico a posição "position_1" para "75"
    E clico em "Salvar"
    Então a posição "position_1" da cartela de ID "1" deve ser atualizada para "75" no banco de dados
    E eu devo ser redirecionado para a página homeUser

  Cenário: Exclusão de uma Cartela de Bingo #H4C4
    Dado que estou logado como "Getulio" com a senha "032023" e na página homeBingoCard com a cartela de ID "1" do evento "Bingao do IF" existente
    Quando clico em "Apagar" para a cartela de ID "1"
    Então a cartela de bingo de ID "1" deve ser removida do banco de dados
    E eu devo ser redirecionado para a página homeBingoCard
    E a cartela de ID "1" não deve ser mais listada
