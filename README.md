# Sistema de Pedidos de Açaí - NCaçaí

## 📝 Sobre

Este projeto é um sistema completo para gerenciamento de pedidos de açaí, incluindo:

- Cardápio digital de açaís e complementos
- Histórico de pedidos
- Integração frontend-backend

## 🛠 Tecnologias Utilizadas

### Frontend
- **HTML5** - Estrutura das páginas
- **CSS3** - Estilização
- **JavaScript** - Lógica e interações
- **Font Awesome** - Ícones

### Backend
- **Node.js** - Ambiente de execução
- **Express** - Framework web
- **PostgreSQL** - Banco de dados

## 🚀 Como Executar o Projeto

### Pré-requisitos
- Node.js (v14+)
- PostgreSQL (v12+)
- NPM 

### Instalação

1. **Clone o repositório**
```bash
git clone https://github.com/niic-noguee/NCa-ai.git
cd NCaçai
```

2. **Instale as dependências**
```bash
npm install
```

3. **Configure o banco de dados**
- Crie um banco PostgreSQL
- Execute os scripts SQL da pasta `database/`

4. **Configure as variáveis de ambiente**
Crie um arquivo `.env` na raiz do projeto:
```env
DB_USER=seu_usuario
DB_PASSWORD=sua_senha
DB_HOST=localhost
DB_PORT=5432
DB_NAME=nome_do_banco
PORT=3000
```

5. **Inicie o servidor**
```bash
npm run dev
```

6. **Acesse o frontend**
Abra o arquivo `index.html` no navegador

## 🔄 Rotas da API

| Método | Rota | Descrição |
|--------|------|-----------|
| GET | `/foods` | Lista todos os açaís |
| GET | `/food/:id` | Busca um açaí específico |
| GET | `/fillings/:id` | Busca complementos de um açaí |
| POST | `/payment` | Registra um pagamento |
| GET | `/history` | Busca histórico por CPF |

## 🛒 Funcionalidades

### Frontend
- Seleção de açaís e complementos
- Cálculo automático de valores
- Responsividade para mobile

### Backend
- CRUD de produtos
- Registro de pedidos
- Consulta de histórico
- Validação de dados

## ✉️ Contato

Desenvolvido por [Nicolly S.S. Nogueira]  
Email: niicolly7nogueira@gmail.com  
GitHub: [@niic-noguee](https://github.com/niic-noguee)
