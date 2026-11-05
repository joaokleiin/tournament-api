# Tournament Manager API

API REST para gerenciamento de torneios de games competitivos.

O projeto permite cadastrar jogadores e times, criar torneios e registrar partidas. A API também possui autenticação, validação dos dados, documentação com Swagger e testes automatizados.

## Funcionalidades

* Cadastro e login de usuários
* Autenticação utilizando JWT
* CRUD de jogadores
* CRUD de times
* CRUD de torneios
* Cadastro de partidas dentro de um torneio
* Validação dos dados recebidos pela API
* Documentação das rotas com Swagger
* Testes automatizados
* Banco MongoDB executado através do Docker

### Principais recursos

| Recurso     | O que faz                                   |
| ----------- | ------------------------------------------- |
| Players     | Cadastro e gerenciamento de jogadores       |
| Teams       | Cadastro de times e seus jogadores          |
| Tournaments | Criação e gerenciamento dos torneios        |
| Matches     | Registro das partidas dos torneios          |
| Auth        | Cadastro, login e autenticação dos usuários |

---

## Tecnologias

* **Node.js** — execução da aplicação
* **Express** — criação da API e rotas
* **TypeScript** — desenvolvimento da aplicação
* **MongoDB** — banco de dados
* **Mongoose** — comunicação com o MongoDB
* **Docker / Docker Compose** — execução do banco de dados
* **JWT** — autenticação
* **bcryptjs** — criptografia das senhas
* **Zod** — validação dos dados
* **Swagger** — documentação da API
* **Jest + Supertest** — testes automatizados
* **mongodb-memory-server** — banco utilizado durante os testes

---

# Como rodar o projeto

## 1. O que precisa estar instalado

Antes de iniciar, o computador precisa ter:

### Node.js

Recomenda-se Node.js **18 ou superior**.

Para verificar se já está instalado:

```powershell
node -v
```

e:

```powershell
npm -v
```

Se os comandos não funcionarem, é necessário instalar o Node.js.

### Docker Desktop

O MongoDB do projeto é executado pelo Docker.

Verifique:

```powershell
docker --version
```

e:

```powershell
docker compose version
```

O Docker Desktop precisa estar **aberto e em execução** antes de iniciar o banco.

### Git (opcional)

O Git só é necessário caso o projeto seja baixado diretamente do GitHub.

```powershell
git --version
```

Se o projeto for copiado por pendrive, por exemplo, o Git não é necessário.

---

# 2. Baixar o projeto

Caso esteja usando Git:

```powershell
git clone URL_DO_REPOSITORIO
```

Depois entre na pasta:

```powershell
cd tournament-api
```

Se o projeto já estiver no computador, basta abrir o terminal dentro da pasta `tournament-api`.

---

# 3. Instalar as dependências

Dentro da pasta do projeto, execute:

```powershell
npm install
```

Esse comando instala todas as dependências presentes no `package.json`.

Não é necessário instalar Jest, Express, Mongoose ou outras bibliotecas manualmente.

---

# 4. Configurar o arquivo `.env`

O projeto utiliza variáveis de ambiente para configurar o banco de dados e a autenticação.

Na raiz do projeto deve existir um arquivo:

```text
.env
```

Use o arquivo `.env.example` como modelo.

Exemplo:

```env
PORT=3000

NODE_ENV=development

MONGO_USERNAME=admin
MONGO_PASSWORD=sua_senha

MONGO_DB=tournamentdb

MONGO_URI=mongodb://admin:sua_senha@localhost:27017/tournamentdb?authSource=admin

JWT_SECRET=sua_chave_secreta
JWT_EXPIRES_IN=1d
```

### Importante

O `.env` não deve ser enviado para o GitHub quando possuir credenciais reais.

O `.env.example` serve apenas como modelo para configurar o ambiente em outro computador.

---

# 5. Iniciar o MongoDB

Com o Docker Desktop aberto, execute na pasta do projeto:

```powershell
docker compose up -d
```

Isso inicia o container do MongoDB.

Para verificar se o container está rodando:

```powershell
docker ps
```

Deve aparecer o container do MongoDB na lista.

Se quiser parar o banco depois:

```powershell
docker compose down
```

Os dados do banco são mantidos pelo volume configurado no Docker Compose.

---

# 6. Iniciar a API

Com o MongoDB rodando, execute:

```powershell
npm run dev
```

Se tudo estiver correto, a API ficará disponível em:

```text
http://localhost:3000
```

Para parar o servidor:

```text
Ctrl + C
```

---

# 7. Abrir o Swagger

Com a API rodando, abra no navegador:

```text
http://localhost:3000/api-docs
```

O Swagger mostra as rotas disponíveis e permite testar a API pelo próprio navegador.

Para rotas protegidas, primeiro faça login para obter o token JWT e depois utilize o botão **Authorize** do Swagger.

---

# 8. Rodar os testes

Os testes podem ser executados sem precisar deixar a API rodando com `npm run dev`.

Em outro terminal, dentro da pasta do projeto:

```powershell
npm test
```

Os testes utilizam o `mongodb-memory-server`, portanto o banco utilizado durante os testes é separado do MongoDB usado normalmente pela aplicação.

Para executar os testes com cobertura:

```powershell
npm run test:coverage
```

---

# 9. Verificar se o projeto está compilando

Também é possível verificar se o TypeScript está compilando corretamente:

```powershell
npm run build
```

Se não houver erros, a versão compilada será gerada na pasta `dist`.

Para executar a versão compilada:

```powershell
npm start
```

---

# Estrutura básica do projeto

```text
tournament-api/
│
├── src/
│   ├── controllers/
│   ├── middlewares/
│   ├── models/
│   ├── routes/
│   ├── services/
│   ├── config/
│   └── server.ts
│
├── tests/
│   ├── auth.test.ts
│   └── tournaments.test.ts
│
├── .env
├── .env.example
├── docker-compose.yml
├── jest.setup.ts
├── package.json
├── tsconfig.json
└── README.md
```

A estrutura pode variar conforme novas funcionalidades forem adicionadas ao projeto.

---

# Principais comandos

| Comando                 | Função                               |
| ----------------------- | ------------------------------------ |
| `npm install`           | Instala as dependências              |
| `npm run dev`           | Inicia a API em modo desenvolvimento |
| `npm run build`         | Compila o TypeScript                 |
| `npm start`             | Executa a versão compilada           |
| `npm test`              | Executa os testes                    |
| `npm run test:coverage` | Executa os testes e gera cobertura   |
| `docker compose up -d`  | Inicia o MongoDB                     |
| `docker compose down`   | Para o MongoDB                       |
| `docker ps`             | Mostra os containers em execução     |

---

# Rodando em outro computador

Para apresentar o projeto em outro computador, o processo é basicamente:

### 1. Instalar

* Node.js 18+
* Docker Desktop

### 2. Copiar ou clonar o projeto

```powershell
git clone URL_DO_REPOSITORIO
cd tournament-api
```

### 3. Instalar as dependências

```powershell
npm install
```

### 4. Criar o `.env`

Copie o conteúdo do `.env.example` para um novo arquivo chamado `.env` e confira as configurações do MongoDB.

### 5. Iniciar o Docker

Abra o Docker Desktop e execute:

```powershell
docker compose up -d
```

### 6. Iniciar a API

```powershell
npm run dev
```

### 7. Acessar o Swagger

Abra:

```text
http://localhost:3000/api-docs
```

### 8. Testar o projeto

```powershell
npm test
```

---

# Observações

* O Docker precisa estar aberto para que o MongoDB esteja disponível.
* O arquivo `.env` deve existir para a aplicação conseguir carregar as configurações.
* O primeiro `npm install` pode demorar um pouco porque todas as dependências serão baixadas.
* Não é necessário instalar o MongoDB diretamente no computador. O projeto utiliza o MongoDB através do Docker.
* Não é necessário instalar as dependências de teste separadamente, pois elas já estão no `package.json`.
* Se a porta `3000` estiver sendo utilizada por outro programa, altere o valor de `PORT` no `.env`.
* Se a porta do MongoDB estiver sendo utilizada por outro serviço, será necessário verificar o `docker-compose.yml`.

## Resumo rápido

Se Node.js e Docker já estiverem instalados, os comandos principais são:

```powershell
npm install
docker compose up -d
npm run dev
```

Depois:

```text
http://localhost:3000/api-docs
```

E para verificar os testes:

```powershell
npm test
```
