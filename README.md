# 🧠 SKU Manager

Gerencie SKUs com facilidade. Este repositório é um **monorepo** contendo:

- 📦 `apps/api` — Backend em **NestJS**
- 🌐 `apps/web` — Frontend em **Next.js**
- 🐘 PostgreSQL via **Docker**
- 🧪 Testes unitários
- 📄 Documentação com Swagger

---

## 📁 Estrutura do Projeto

```
sku-manager/
├── apps/
│   ├── api/       → Backend NestJS
│   └── web/       → Frontend Next.js
├── prisma/        → Migrations e schema
├── docker-compose.yml
├── package.json   → Comandos e dependências do monorepo
└── .env           → Variáveis de ambiente
```

---

## 🚀 Como rodar localmente

### 1. Clonar o repositório

```bash
git clone git@github.com:Tayna-Censi/sku-manager.git
cd sku-manager
```

### 2. Instalar dependências

```bash
npm install
```

### 3. Subir banco de dados com Docker

```bash
docker-compose up -d
```

### 4. Rodar as aplicações

```bash
# Backend (NestJS)
cd apps/api
npm run start:dev

# Frontend (Next.js)
cd ../web
npm run dev
```

---

## 🛠️ Comandos Úteis

| Comando                      | Descrição                            |
|-----------------------------|----------------------------------------|
| `npm install`               | Instala dependências do monorepo       |
| `docker-compose up -d`     | Sobe o PostgreSQL                      |
| `cd apps/api && npm run test` | Roda testes unitários no backend       |
| `cd apps/web && npm run lint` | Lint do frontend                      |

---

## 🧪 Testes

- **Backend**: `apps/api/test`
- **Frontend**: `apps/web/__tests__`

---

## 📘 Documentação

- Acesse: `http://localhost:3000/api` (Swagger habilitado no backend)

---

## 🧑‍💻 Autoria

Desenvolvido por [@Tayna-Censi](https://github.com/Tayna-Censi)

---

## 📄 Licença

Este projeto está licenciado sob a [MIT License](LICENSE).
