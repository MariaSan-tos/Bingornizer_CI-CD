# language: pt

  # features/user_profile_management.feature

Funcionalidade: Gerenciamento de Perfil de Usuário
  Como um usuário logado
  Eu quero editar e deletar meu perfil
  Para manter minhas informações atualizadas ou remover minha conta

  Cenário: Edição de Perfil de Usuário - Alterar Username e Email
    Dado que estou logado como "Getulio" com a senha "032023" e na página homeUser
    Quando clico em "Editar Usuário"
    E modifico o username para "Getulio Editado" e o email para "getulio.editado@gmail.com"
    E clico em "Salvar"
    Então minhas informações de usuário devem ser atualizadas no banco de dados
    E a sessão do usuário deve ser atualizada com "Getulio Editado"
    E eu devo ser redirecionado para a página homeUser

  Cenário: Edição de Perfil de Usuário - Alterar Senha
    Dado que estou logado como "Nicolas" com a senha "12345" e na página homeUser
    Quando clico em "Editar Usuário"
    E modifico a senha para "novaSenha123"
    E clico em "Salvar"
    Então minhas informações de usuário devem ser atualizadas no banco de dados
    E a sessão do usuário deve ser atualizada
    E eu devo ser redirecionado para a página homeUser

  Cenário: Exclusão de Perfil de Usuário
    Dado que estou logado como "Nicolas" com a senha "12345" e na página de edição de usuário
    Quando clico em "Apagar"
    Então meu usuário deve ser removido do banco de dados
    E minha sessão deve ser encerrada
    E eu devo ser redirecionado para a página inicial (homePage)