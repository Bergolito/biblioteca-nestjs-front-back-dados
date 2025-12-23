# Biblioteca Backend

API RESTful para gerenciamento de biblioteca pessoal desenvolvida com NestJS, TypeORM e PostgreSQL.

## 📋 Requisitos

- Node.js (v18 ou superior)
- Docker e Docker Compose
- npm ou yarn

## 🚀 Instalação

1. Clone o repositório

2. Instale as dependências:
```bash
npm install
```

3. Configure as variáveis de ambiente:
O arquivo `.env` já está criado com as configurações padrão:
```
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=postgres
DB_DATABASE=biblioteca
PORT=3000
```

4. Inicie o banco de dados PostgreSQL com Docker:
```bash
docker-compose up -d
```

5. Inicie a aplicação:
```bash
# Desenvolvimento
npm run start:dev

# Produção
npm run build
npm run start:prod
```

## 📊 Estrutura do Banco de Dados

### Entidades

- **Autor**: id, nome, nacionalidade
- **Editora**: id, nome
- **Livro**: id, titulo, subtitulo, autor_id, editora_id, edicao, num_paginas, ano, imagem_id
- **Categoria**: id, nome, descricao
- **CategoriaLivro**: id, livro_id, categoria_id (tabela de relacionamento)
- **ImagemLivro**: id, descricao, arquivo
- **Usuario**: id, email, nome, endereco, data_nasc, sexo, telefone
- **LivroUsuario**: id, livro_id, usuario_id (tabela de relacionamento)

## 🔌 Endpoints da API

### Autores
- `GET /autor` - Lista todos os autores
- `GET /autor/:id` - Busca um autor por ID
- `POST /autor` - Cria um novo autor
- `PATCH /autor/:id` - Atualiza um autor
- `DELETE /autor/:id` - Remove um autor

### Editoras
- `GET /editora` - Lista todas as editoras
- `GET /editora/:id` - Busca uma editora por ID
- `POST /editora` - Cria uma nova editora
- `PATCH /editora/:id` - Atualiza uma editora
- `DELETE /editora/:id` - Remove uma editora

### Livros
- `GET /livro` - Lista todos os livros
- `GET /livro/:id` - Busca um livro por ID
- `POST /livro` - Cria um novo livro
- `PATCH /livro/:id` - Atualiza um livro
- `DELETE /livro/:id` - Remove um livro

### Categorias
- `GET /categoria` - Lista todas as categorias
- `GET /categoria/:id` - Busca uma categoria por ID
- `POST /categoria` - Cria uma nova categoria
- `PATCH /categoria/:id` - Atualiza uma categoria
- `DELETE /categoria/:id` - Remove uma categoria

### Usuários
- `GET /usuario` - Lista todos os usuários
- `GET /usuario/:id` - Busca um usuário por ID
- `POST /usuario` - Cria um novo usuário
- `PATCH /usuario/:id` - Atualiza um usuário
- `DELETE /usuario/:id` - Remove um usuário

### Imagens de Livros
- `GET /imagem-livro` - Lista todas as imagens
- `GET /imagem-livro/:id` - Busca uma imagem por ID
- `POST /imagem-livro` - Cria uma nova imagem
- `PATCH /imagem-livro/:id` - Atualiza uma imagem
- `DELETE /imagem-livro/:id` - Remove uma imagem

## 🛠️ Tecnologias Utilizadas

- **NestJS** - Framework Node.js
- **TypeORM** - ORM para TypeScript/JavaScript
- **PostgreSQL** - Banco de dados relacional
- **Docker** - Containerização
- **class-validator** - Validação de dados
- **class-transformer** - Transformação de objetos

## 📝 Scripts Disponíveis

```bash
npm run start          # Inicia a aplicação
npm run start:dev      # Inicia em modo desenvolvimento
npm run start:prod     # Inicia em modo produção
npm run build          # Compila o projeto
npm run lint           # Executa o linter
npm run test           # Executa os testes
```

## 🐳 Docker

Para parar o container do PostgreSQL:
```bash
docker-compose down
```

Para visualizar os logs:
```bash
docker-compose logs -f
```

## 📄 Licença

MIT
