# Projeto - Backend

Este é o backend da aplicação. A aplicação foi construída utilizando Node.js, Express.js e o ORM Prisma para interagir com o banco de dados PostgreSQL.

# Funcionalidades

Cadastro de usuários(Create)<br/>
Ler usuários(Read)<br/>
Atualização de usuários(Update)<br/>
Deleção de usuários(Delete)<br/>
Autenticação de usuários com JWT

# Como executar

1- Clone o repositório para sua máquina.<br/><br/>
2- Crie um arquivo .env na raiz do projeto seguindo o exemplo do arquivo .env.example e configure as variáveis de ambiente de acordo com o seu ambiente de desenvolvimento<br/><br/>
3 -Execute o comando npm install na raiz do projeto para instalar as dependências<br/><br/>
4- Execute o comando npx prisma migrate dev na raiz do projeto para executar as migrações do banco de dados<br/><br/>
5- Execute o comando npm run dev para iniciar o servidor de desenvolvimento<br/><br/>
6- O servidor será executado na porta 3000 por padrão. Você pode acessar a documentação da API através da rota /user.

# Rotas

POST /users
Cadastra um novo usuário na aplicação.

# Requisição

json:

{
  "name": "João Silva",
  "email": "joao.silva@gmail.com",
  "password": "minhasenha"
}

# Resposta

json:

{
  "user": {
    "id": 1,
    "name": "João Silva",
    "email": "joao.silva@gmail.com"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}

POST /auth
Autentica um usuário e retorna um token JWT.

# Requisição

json:

{
  "email": "joao.silva@gmail.com",
  "password": "minhasenha"
}

# Resposta

json:

{
  "user": {
    "id": 1,
    "email": "joao.silva@gmail.com"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
DELETE /users/:id
Deleta um usuário existente.

# Resposta

json

{
  "message": "Usuário deletado com sucesso."
}

# Licença

Este projeto está licenciado sob a licença MIT. Consulte o arquivo LICENSE para obter mais informações.
