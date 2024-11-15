# Desafio Técnico - Sistema de Gestão de Vendas e Produtos

Este é um projeto de backend para um desafio Técnico, que gerencia vendas e produtos de uma loja fictícia de eletrônicos. O sistema inclui funcionalidades como o gerenciamento de produtos, registro de vendas e controle de estoque, utilizando **Node.js** com **Prisma** e **MySQL**.

## Requisitos

Antes de começar, verifique se você tem as seguintes dependências instaladas no seu sistema:

- [Node.js](https://nodejs.org) (versão 16 ou superior)
- [MySQL](https://www.mysql.com) 

## Configuração

### 1. Clonar o repositório

Primeiro, clone o repositório para sua máquina local:

  ```bash
  git clone https://github.com/MatheusSCristo/DesafioNodeBack.git
 ```
 
### 2. Instalar dependências
  ```bash
  npm install
  ```
### 3. Configurar o banco de dados

Este projeto utiliza o Prisma para se conectar ao banco de dados. Você precisará configurar a string de conexão com o banco de dados MySQL.
- Passo 1: Crie um banco de dados no MySQL (caso não tenha um). O nome do banco de dados pode ser algo como stock.
- Passo 2: No diretório raiz do projeto, abra o arquivo .env e configure a variável DATABASE_URL  com a URL de conexão do seu banco de dados MySQL e adicione a variavel PORT como abaixo:
  ```bash
  DATABASE_URL="mysql://username:password@localhost:3306/stock"
  PORT=5000
  ```
  Substitua:
  - username pelo seu nome de usuário do MySQL.
  - password pela senha do seu banco de dados.
  - stock pelo nome do banco de dados que você criou.

### 4.Rodar as migrações
Com o banco de dados configurado, execute as migrações para criar as tabelas necessárias no banco de dados:
```bash
  npx prisma migrate dev --name v1
```

### 5.Gerar o Prisma Client
Depois de rodar as migrações, gere o Prisma Client para poder interagir com o banco de dados no seu código:
```bash
  npx prisma generate
```
### 6.Popular o Banco de Dados
Após configurado, é necessário rodar o script de popular o banco de dados.
```bash
  node populateDb.js
```

### 7.Rodar o servidor
```bash
  node server.js
```

## Funcionalidades
- Cadastro de Produtos: Adicione produtos com informações como nome, categoria, preço, quantidade disponível, etc.
- Registro de Vendas: Registre vendas, incluindo os produtos vendidos e o preço total.
- Controle de Estoque: Atualize automaticamente a quantidade de produtos no estoque conforme as vendas.



