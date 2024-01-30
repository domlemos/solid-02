Gympass style app

## RFs Requisitos funcionais

- [x] Deve ser possível se cadastrar
- [] Deve ser possível se autenticar
- [x] Deve ser possível obter o perfil de usuário logado
- [] Deve ser possível obter o número de checkins realizado pelo usuário logado
- [] Deve ser possível obter o usuário obter seu histórico de checkins
- [] Deve ser possível obter o usuário buscar academias mais próximas
- [] Deve ser possível obter o usuário buscar academias pelo nome
- [] Deve ser possível obter o usuário realizar checkin em uma academia
- [] Deve ser possível obter o validar o checkin de um usuário
- [] Deve ser possível cadastrar uma academia

## RNs (Regras de Negócio)

- [x] Usuário não deve poder se cadastrar com um email duplicado
- [] Usuário não pode fazer dois chek-in no mesmo dia
- [] Usuário não pode fazer dois check-in se não estiver perto (100m) da academia
- [] O check-in se só pode ser validade até 20 minutos após criado
- [] O check-in só pode ser validado por administradores
- [] Academia só pode ser cadastrada por administradores

## RNFs (Requisitos não-funcionais)

- [x] A senha do usuário precisa estar criptografada
- [x] Os dados da aplicação precisam estar persistido em um banco PostgresSQL
- [] Todas as lista de dados precisam estar paginadas com 20 dias por página
- [] Usuário deve ser identificado por um JWT
