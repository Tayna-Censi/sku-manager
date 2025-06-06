# SKU Manager Backend

Este projeto é o backend do sistema SKU Manager, responsável por gerenciar SKUs, produtos e integrações via API REST.

## Tecnologias Utilizadas

- Node.js (https://nodejs.org/)
- Express (https://expressjs.com/)
- TypeScript (https://www.typescriptlang.org/)
- Prisma ORM (https://www.prisma.io/)
- PostgreSQL (https://www.postgresql.org/) (ou outro banco relacional)

## Como rodar o projeto

1. Instale as dependências:

```npm install
# ou
yarn install ```

2. Configure as variáveis de ambiente:  
Crie um arquivo `.env` na raiz do projeto com as configurações do banco de dados, por exemplo:

DATABASE_URL="postgresql://usuario:senha@localhost:5432/sku_manager"
PORT=4001

3. Execute as migrações do banco de dados:

npx prisma migrate dev

4. Gere o client Prisma:

```npx prisma generate ```

5. Inicie o servidor de desenvolvimento:

```npm run start:dev
# ou
yarn start:dev ```

O backend estará disponível em http://localhost:4001.

## Prisma ORM

Este projeto usa Prisma para acesso ao banco de dados.

### Configuração

- Configure a variável `DATABASE_URL` no arquivo `.env` com a string de conexão do banco.

### Comandos principais

- Rodar migrações e atualizar o banco:

```npx prisma migrate dev```

- Gerar o client Prisma:

```npx prisma generate```

## Scripts úteis

- dev — Inicia o servidor em modo desenvolvimento  
- build — Compila o projeto para produção  
- start — Inicia o servidor em produção  
- prisma — Comandos para gerenciar o banco de dados (migrações, geração de client, studio)

## Estrutura de Pastas

- src/ — Código-fonte principal  
- prisma/ — Configuração do Prisma ORM  

## Testes

Para rodar os testes:

```npm run test
# ou
yarn test```

## Deploy

Para deploy, configure as variáveis de ambiente e execute os scripts de build/start conforme sua plataforma.

---

Desenvolvido por [Tayna Britney Censi].
