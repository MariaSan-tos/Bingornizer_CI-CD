# language: pt

Funcionalidade: Login no Sistema
  Como um usuário registrado
  Eu quero fazer login no sistema
  Para acessar meus eventos e cartelas de bingo

  Cenário: Login Bem-Sucedido
    Dado que estou na página de login
    Quando insiro o email "getuliofurtado03@gmail.com" e a senha "032023" válidos e existentes no sistema
    Então minha sessão de usuário deve ser estabelecida
    E eu devo ser redirecionado para a página inicial do usuario (homeUser) exibindo meus eventos

  Cenário: Login com Credenciais Inválidas - Senha Incorreta
    Dado que estou na página de login
    Quando insiro o email "getuliofurtado03@gmail.com" válido e uma senha "senhaerrada" inválida
    Então o sistema deve exibir a mensagem "usuario inexistente"
    E minha sessão de usuário não deve ser estabelecida

  Cenário: Login com Credenciais Inválidas - Email Inexistente
    Dado que estou na página de login
    Quando insiro o email "naoexiste@teste.com" inexistente e a senha "senha123" válida
    Então o sistema deve exibir a mensagem "usuario inexistente"
    E minha sessão de usuário não deve ser estabelecida

  Cenário: Login com Credenciais Inválidas - Ambos Inválidos
    Dado que estou na página de login
    Quando insiro o email "invalido.com" inválido e a senha "curta" inválida
    Então o sistema deve exibir a mensagem "usuario inexistente"
    E minha sessão de usuário não deve ser estabelecida