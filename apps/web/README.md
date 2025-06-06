# SKU Manager Frontend

Frontend do sistema **SKU Manager**, desenvolvido com [Next.js](https://nextjs.org/) e [Tailwind CSS](https://tailwindcss.com/).

---

## Tecnologias

- [Next.js](https://nextjs.org/) (App Router)
- [React](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [React Hook Form](https://react-hook-form.com/)
- [Zod](https://zod.dev/)
- [React Query](https://tanstack.com/query/latest)
- [Axios](https://axios-http.com/)

---

## Como rodar o projeto

1. Instale as dependências:

   ```bash
   npm install
   # ou
   yarn install
   ```

2. Inicie o servidor de desenvolvimento:

   ```bash
   npm run dev
   # ou
   yarn dev
   ```

3. Acesse no navegador: [http://localhost:3000](http://localhost:3000)

---

## Estrutura de pastas

```
src/
 ├─ app/       # Páginas e rotas do Next.js
 ├─ service/   # Serviços de API, schemas e helpers
public/       # Arquivos estáticos
```

---

## Configuração

- A API deve estar rodando em `http://localhost:4001` por padrão.
- Variáveis de ambiente podem ser configuradas no arquivo `.env`.

---

## Scripts úteis

| Script      | Descrição                      |
| ----------- | ------------------------------|
| `dev`       | Inicia o servidor de desenvolvimento |
| `build`     | Gera a build de produção       |
| `start`     | Inicia o servidor em produção  |
| `lint`      | Executa o linter               |

---

## Deploy

Para deploy, consulte a documentação oficial do [Next.js](https://nextjs.org/docs/deployment).

---

## Autor

Desenvolvido por **Tayna Britney Censi**.
