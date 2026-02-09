# 📚 API de Gerenciamento Bibliotecário

Uma API RESTful completa para gerenciar livros e empréstimos em uma biblioteca. Construída com **Node.js**, **Express** e autenticação segura com **JWT**.

## 🚀 Começando

### Pré-requisitos
- Node.js (v16 ou superior)
- npm ou yarn

### Instalação

1. Clone o repositório:
```bash
git clone <seu-repositorio>
cd gerenciamento_bibliotecario
```

2. Instale as dependências:
```bash
npm install
```

3. Configure as variáveis de ambiente criando um arquivo `.env`:
```env
PORT=3000
JWT_SECRET=sua_chave_secreta_aqui
```

4. Inicie o servidor:
```bash
npm run dev
```

O servidor estará disponível em `http://localhost:3000`

---

## 📋 Autenticação

A API usa **JWT (JSON Web Token)** para autenticação. Alguns endpoints requerem um token válido no header:

```
Authorization: Bearer seu_token_aqui
```

### Endpoints de Autenticação

#### 📝 Registrar novo usuário
```http
POST /auth/register
Content-Type: application/json

{
  "name": "João Silva",
  "email": "joao@email.com",
  "password": "senha123"
}
```

**Resposta (201):**
```json
{
  "id": "uuid-gerado",
  "name": "João Silva",
  "email": "joao@email.com",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

---

#### 🔐 Fazer login
```http
POST /auth/login
Content-Type: application/json

{
  "email": "joao@email.com",
  "password": "senha123"
}
```

**Resposta (200):**
```json
{
  "id": "uuid-do-usuario",
  "name": "João Silva",
  "email": "joao@email.com",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

---

## 📚 Gerenciamento de Livros

### Endpoints Públicos (sem autenticação)

#### 📖 Listar todos os livros
```http
GET /api/books
```

**Resposta (200):**
```json
[
  {
    "id": "uuid-1",
    "title": "Clean Code",
    "author": "Robert C. Martin",
    "quantity": 3
  },
  {
    "id": "uuid-2",
    "title": "The Pragmatic Programmer",
    "author": "David Thomas",
    "quantity": 2
  }
]
```

---

#### 🔍 Buscar livro por ID
```http
GET /api/books/:id
```

**Resposta (200):**
```json
{
  "id": "uuid-1",
  "title": "Clean Code",
  "author": "Robert C. Martin",
  "quantity": 3
}
```

---

#### ➕ Criar novo livro
```http
POST /api/books
Content-Type: application/json

{
  "title": "Design Patterns",
  "author": "Gang of Four",
  "quantity": 5
}
```

**Resposta (201):**
```json
{
  "id": "uuid-novo",
  "title": "Design Patterns",
  "author": "Gang of Four",
  "quantity": 5
}
```

---

#### ✏️ Atualizar livro
```http
PUT /api/books/:id
Content-Type: application/json

{
  "title": "Design Patterns Revisited",
  "quantity": 4
}
```

**Resposta (200):**
```json
{
  "id": "uuid-1",
  "title": "Design Patterns Revisited",
  "author": "Gang of Four",
  "quantity": 4
}
```

---

#### 🗑️ Deletar livro
```http
DELETE /api/books/:id
```

**Resposta (200):**
```json
{
  "message": "Livro deletado com sucesso"
}
```

---

## 🎫 Gerenciamento de Empréstimos

### Endpoints Públicos (sem autenticação)

#### 📋 Listar todos os empréstimos
```http
GET /api/loans
```

**Resposta (200):**
```json
[
  {
    "id": "uuid-emprestimo-1",
    "userId": "uuid-usuario",
    "bookId": "uuid-livro",
    "loanDate": "2026-02-05T10:30:00.000Z",
    "returnDate": "2026-02-19T10:30:00.000Z",
    "isReturned": false,
    "isLate": false
  }
]
```

---

#### 🔍 Buscar empréstimo por ID
```http
GET /api/loans/:id
```

**Resposta (200):**
```json
{
  "id": "uuid-emprestimo-1",
  "userId": "uuid-usuario",
  "bookId": "uuid-livro",
  "loanDate": "2026-02-05T10:30:00.000Z",
  "returnDate": "2026-02-19T10:30:00.000Z",
  "isReturned": false,
  "isLate": false
}
```

---

### Endpoints Protegidos (requer autenticação)

#### 📤 Criar novo empréstimo
```http
POST /api/loans
Content-Type: application/json
Authorization: Bearer seu_token_aqui

{
  "bookId": "uuid-do-livro"
}
```

**Resposta (201):**
```json
{
  "id": "uuid-novo-emprestimo",
  "userId": "uuid-usuario-autenticado",
  "bookId": "uuid-do-livro",
  "loanDate": "2026-02-09T14:20:00.000Z",
  "returnDate": "2026-02-23T14:20:00.000Z",
  "isReturned": false,
  "isLate": false
}
```

**Regra:** O livro precisa ter quantidade disponível (quantity > 0).

---

#### ✅ Devolver livro (encerrar empréstimo)
```http
POST /api/loans/:id/return
```

**Resposta (200):**
```json
{
  "id": "uuid-emprestimo-1",
  "userId": "uuid-usuario",
  "bookId": "uuid-livro",
  "loanDate": "2026-02-05T10:30:00.000Z",
  "returnDate": "2026-02-09T15:45:00.000Z",
  "isReturned": true,
  "isLate": false
}
```

**Funcionamento:**
- Marca o empréstimo como devolvido (`isReturned: true`)
- Atualiza a data de devolução com a data atual
- Verifica se há atraso (compara data atual com returnDate)
- Incrementa a quantidade do livro em 1 (livro volta ao acervo)

---

## 🛠️ Testando a API

### Usando cURL

#### Registrar usuário:
```bash
curl -X POST http://localhost:3000/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "João Silva",
    "email": "joao@email.com",
    "password": "senha123"
  }'
```

#### Fazer login:
```bash
curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "joao@email.com",
    "password": "senha123"
  }'
```

#### Listar livros:
```bash
curl http://localhost:3000/api/books
```

#### Criar empréstimo (substitua TOKEN e BOOK_ID):
```bash
curl -X POST http://localhost:3000/api/loans \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer TOKEN" \
  -d '{
    "bookId": "BOOK_ID"
  }'
```

#### Devolver livro (substitua LOAN_ID):
```bash
curl -X POST http://localhost:3000/api/loans/LOAN_ID/return
```

### Usando Postman

1. Importe as rotas como uma collection
2. Configure a variável `Authorization` no header para endpoints protegidos
3. Use exemplos de request/response fornecidos acima

---

## 📊 Estrutura de Dados

### Usuário
```json
{
  "id": "string (UUID)",
  "name": "string",
  "email": "string",
  "password": "string (hash bcrypt)"
}
```

### Livro
```json
{
  "id": "string (UUID)",
  "title": "string",
  "author": "string",
  "quantity": "number (exemplares disponíveis)"
}
```

### Empréstimo
```json
{
  "id": "string (UUID)",
  "userId": "string (UUID do usuário)",
  "bookId": "string (UUID do livro)",
  "loanDate": "Date (data do empréstimo)",
  "returnDate": "Date (prazo de devolução ou data real de devolução)",
  "isReturned": "boolean (se foi devolvido)",
  "isLate": "boolean (se está atrasado)"
}
```

---

## ⚠️ Códigos de Erro

| Código | Descrição |
|--------|-----------|
| 200 | Requisição bem-sucedida |
| 201 | Recurso criado com sucesso |
| 400 | Requisição inválida |
| 404 | Recurso não encontrado |
| 409 | Conflito (ex: e-mail já registrado) |
| 500 | Erro no servidor |

---

## 🔒 Segurança

- Senhas são criptografadas com **bcrypt**
- Tokens JWT com expiração configurável
- Middleware de autenticação em rotas protegidas
- Validação de entrada de dados

---

## 📦 Dependências

- **express** - Framework web
- **jsonwebtoken** - Autenticação com JWT
- **bcrypt** - Criptografia de senhas
- **uuid** - Geração de IDs únicos
- **dotenv** - Variáveis de ambiente

---

## 📝 Notas Importantes

- O prazo padrão para empréstimos é de **14 dias**
- Um livro só pode ser emprestado se houver exemplares disponíveis
- A devolução incrementa automaticamente a quantidade de livros
- Erros de autenticação retornam status 401

---

## 🤝 Contribuindo

Sinta-se livre para abrir issues ou fazer pull requests com melhorias.

---

## 📄 Licença

Este projeto está sob licença ISC.

---

**Desenvolvido com ❤️**
