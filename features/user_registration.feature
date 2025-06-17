# language: pt

Funcionalidade: Cadastro de Usuário #H1
  Como um novo usuário
  Eu quero me cadastrar no sistema
  Para ter acesso às funcionalidades de gerenciamento de eventos e cartelas de bingo

  Cenário: Registro de Usuário Bem-Sucedido #H1C1
    Dado que estou na página de cadastro
    Quando preencho o formulário com um username "usuario_valido", um email "usuario@teste.com" e uma senha "senha123"
    Então meu usuário deve ser criado com sucesso no banco de dados
    E eu devo ser redirecionado para a página de login

  Cenário: Tentativa de Registro com Email Existente #H1C2
    Dado que estou na página de cadastro
    Quando preencho o formulário com um username "outro_usuario", um email "existe@teste.com" e uma senha "senhaexistente"
    Então o sistema deve exibir uma mensagem informando que "Já existe um usuário com esse email"
    E meu usuário não deve ser criado novamente

  Cenário: Tentativa de Registro com Campos Vazios - Username Vazio #H1C3
    Dado que estou na página de cadastro
    Quando eu envio o formulário deixando o campo "username" em branco, campo "email" "email@vazio.com" e campo "password" "senha12345"
    Então o sistema deve impedir o registro
    E exibir uma validação HTML para o campo "username"

  Cenário: Tentativa de Registro com Campos Vazios - Email Vazio #H1C3
    Dado que estou na página de cadastro
    Quando eu envio o formulário deixando o campo "email" em branco, campo "username" "usuarioTeste" e campo "password" "senha12345"
    Então o sistema deve impedir o registro
    E exibir uma validação HTML para o campo "email"

  Cenário: Tentativa de Registro com Campos Vazios - Senha Vazia #H1C3
    Dado que estou na página de cadastro
    Quando eu envio o formulário deixando o campo "password" em branco, campo "username" "usuarioTeste" e campo "email" "email@vazio.com"
    Então o sistema deve impedir o registro
    E exibir uma validação HTML para o campo "password"

  Cenário: Tentativa de Registro com Campos Inválidos - Username muito curto #H1C1
    Dado que estou na página de cadastro
    Quando preencho o formulário com um username "a", um email "teste@email.com" e uma senha "senha123"
    Então o sistema deve exibir a mensagem "Seu username deve conter mais de 3 caracteres"
    E meu usuário não deve ser criado novamente

  Cenário: Tentativa de Registro com Campos Inválidos - Email sem @ #H1C1
    Dado que estou na página de cadastro
    Quando preencho o formulário com um username "usuario_invalido", um email "emailinvalido.com" e uma senha "senha123"
    Então o sistema deve exibir a mensagem "Insira um endereço de email válido"
    E meu usuário não deve ser criado novamente

  Cenário: Tentativa de Registro com Campos Inválidos - Senha muito curta #H1C1
    Dado que estou na página de cadastro
    Quando preencho o formulário com um username "usuario_valido_01", um email "email_valido_01@email.com" e uma senha "curta"
    Então o sistema deve exibir a mensagem "A senha deve possuir pelo menos 8 caracteres"
    E meu usuário não deve ser criado novamente
