# Projeto NetoDonalds

O projeto consiste em um sistema simples de venda de lanches semelhante ao McDonalds. O sistema irá possibilitar a venda de lanches como tapioca, cuzcuz, sanduiche e panquecas, onde será possível escolher recheios diversos. O sistema será uma aplicação fullstack com back-end, front-end e banco de dados (postgres).

## Design do Projeto

![alt text](image-1.png)

## Como executar a parte Back-end do projeto

1. Clonar o projeto ou baixar os arquivo para a sua máquina.
2. Instalar as dependências executando o comando abaixo dentro da pasta Back-end:

```
npm i
```

3. Executar o servidor (Back-end) com o comando:

```
npm run dev
```

## Dev Log

**Aula 05 - 27/05 (terça)**

- [x] Criação da rota **/payment** e da tabela payment.

**Aula 04 - 26/05 (segunda-noite)**

- [x] Apromiramento do front-end.
  - [x] Integração com o Back-end
  - [x] Leitura dos dados da comida e dos recheios
  - [x] Instalação do cors no server.js

**Aula 03 - 26/05 (segunda-manhã)**

- [x] Criação do início do front-end.
  - [x] Criação dos arquivos index.html, style.css e script.js
  - [x] Inclusão da logo do projeto na pasta Front-end/imgs

**Aula 02 - 20/05 (terça)**

- [x] Criação da tabela **fillings** e criação da rota /food/:id.
  - [x] A rota **/food/:id** retorna uma comida identificada pelo id, como também os recheios associados a ela

**Aula 01 - 19/05 (segunda)**

- [x] Criação da base de dados e início do back-end.
  - [x] Criação da estrutura de arquivos do servidor (server.js, controller.js, repository.js e database.js)
  - [x] Criação da tabela **foods** (SQLs na pasta Database)
  - [x] Criação da rota inicial **/foods**