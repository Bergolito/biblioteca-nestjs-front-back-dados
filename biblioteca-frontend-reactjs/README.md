# Biblioteca Pessoal - Frontend React































































































































































































































































6. **Debounce filtros** para evitar requisições excessivas5. **Cache dados** quando apropriado4. **Use tipos TypeScript** para evitar erros3. **Valide dados** antes de enviar para API2. **Mostre feedback visual** durante carregamento1. **Sempre use try-catch** para tratar erros## Boas Práticas```}  idioma_id?: number;  editora_id?: number;  autor_id?: number;  ano?: number;  subtitulo?: string;  titulo?: string;interface LivroFilters {}  idioma?: Idioma;  editora?: Editora;  autor?: Autor;  idioma_id?: number;  editora_id?: number;  autor_id?: number;  ano?: number;  num_paginas?: number;  edicao?: number;  subtitulo?: string;  titulo: string;  id: number;interface Livro {```typescript### Livro```}  nome?: string;interface EditoraFilters {}  nome: string;  id: number;interface Editora {```typescript### Editora```}  nacionalidade?: string;  nome?: string;interface AutorFilters {}  nacionalidade?: string;  nome: string;  id: number;interface Autor {```typescript### Autor## Tipos TypeScript```localStorage.removeItem('token');```typescript### Remover Token```localStorage.setItem('token', 'seu-token-jwt');// O token é automaticamente adicionado aos headers```typescript### Adicionar Token de AutenticaçãoO serviço de API já está configurado com interceptors para:## Interceptors do Axios```};  );    </div>      ))}        <div key={autor.id}>{autor.nome}</div>      {autores.map(autor => (    <div>  return (  if (error) return <div>{error}</div>;  if (loading) return <div>Carregando...</div>;  };    }      setLoading(false);    } finally {      console.error(err);      setError('Erro ao carregar autores');    } catch (err) {      setAutores(data);      const data = await autorService.getAll();    try {    setError(null);    setLoading(true);  const loadAutores = async () => {  }, []);    loadAutores();  useEffect(() => {  const [error, setError] = useState<string | null>(null);  const [loading, setLoading] = useState(false);  const [autores, setAutores] = useState<Autor[]>([]);const MeuComponente: React.FC = () => {import { Autor } from '../types/autor';import { autorService } from '../services/autorService';import React, { useState, useEffect } from 'react';```typescript### Exemplo com useState e useEffect## Uso em Componentes React```}  // Exibir mensagem de erro para o usuário  console.error('Erro ao carregar autores:', error);} catch (error) {  setAutores(autores);  const autores = await autorService.getAll();try {```typescriptTodos os serviços podem lançar exceções. Use try-catch:## Tratamento de Erros```});  num_paginas: 260const livroAtualizado = await livroService.update(1, {```typescript### Atualizar livro```});  idioma_id: 1  editora_id: 2,  autor_id: 1,  num_paginas: 256,  edicao: 1,  ano: 1899,  subtitulo: 'Romance',  titulo: 'Dom Casmurro',const novoLivro = await livroService.create({```typescript### Criar novo livro```});  editora_id: 2  autor_id: 1,  ano: 1899,  titulo: 'Dom Casmurro',const livros = await livroService.getAll({```typescript### Listar com filtros avançados```const livros = await livroService.getAll();```typescript### Listar todos os livros```import { livroService } from '../services/livroService';```typescript### Importar o serviço## Serviço de Livros```});  nome: 'Companhia das Letras'const novaEditora = await editoraService.create({```typescript### Criar nova editora```});  nome: 'Companhia'const editoras = await editoraService.getAll({```typescript### Listar com filtros```const editoras = await editoraService.getAll();```typescript### Listar todas as editoras```import { editoraService } from '../services/editoraService';```typescript### Importar o serviço## Serviço de Editoras```await autorService.delete(1);```typescript### Excluir autor```});  nacionalidade: 'Brasil'const autorAtualizado = await autorService.update(1, {```typescript### Atualizar autor```});  nacionalidade: 'Brasileiro'  nome: 'Machado de Assis',const novoAutor = await autorService.create({```typescript### Criar novo autor```const autor = await autorService.getById(1);```typescript### Buscar por ID```});  nacionalidade: 'Brasileiro'  nome: 'Machado',const autores = await autorService.getAll({```typescript### Listar com filtros```const autores = await autorService.getAll();```typescript### Listar todos os autores```import { autorService } from '../services/autorService';```typescript### Importar o serviço## Serviço de AutoresEste documento contém exemplos de como usar os serviços da API no frontend.Sistema de gerenciamento de biblioteca pessoal desenvolvido com React, TypeScript e Material-UI.

## 📋 Índice

- [Tecnologias](#tecnologias)
- [Instalação](#instalação)
- [Executar](#executar)
- [Funcionalidades](#funcionalidades)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [API Backend](#api-backend)

## 🚀 Tecnologias

- **React 18** - Biblioteca UI
- **TypeScript** - Tipagem estática
- **Material-UI (MUI) v5** - Componentes UI
- **MUI X Data Grid** - Tabelas avançadas com filtros e paginação
- **React Router DOM v6** - Roteamento
- **Axios** - Cliente HTTP para API REST
- **Vite** - Build tool moderna e rápida

## 📦 Instalação

### Pré-requisitos

- Node.js 18+ 
- npm ou yarn
- Backend da biblioteca rodando (porta 3001)

### Passo a Passo

1. **Clone o repositório** (se ainda não fez)

2. **Entre no diretório do projeto:**
```bash
cd biblioteca-frontend-reactjs
```

3. **Instale as dependências:**
```bash
npm install
```

Ou use o script de instalação:
```bash
chmod +x install.sh
./install.sh
```

4. **Configure as variáveis de ambiente:**
   - Copie o arquivo `.env.example` para `.env`
   - Ajuste a URL da API se necessário:
```bash
VITE_API_URL=http://localhost:3001
```

## 🎮 Executar

### Modo Desenvolvimento

```bash
npm run dev
```

O aplicativo estará disponível em: **http://localhost:3000**

### Build para Produção

```bash
npm run build
```

Os arquivos otimizados serão gerados na pasta `dist/`

### Preview do Build

```bash
npm run preview
```

## ✨ Funcionalidades

### 📚 CRUD de Autores
- ✅ Listagem com grid paginado
- ✅ Filtros de pesquisa (nome, nacionalidade)
- ✅ Criação de novo autor
- ✅ Edição de autor existente
- ✅ Visualização de detalhes
- ✅ Exclusão com confirmação

### 🏢 CRUD de Editoras
- ✅ Listagem com grid paginado
- ✅ Filtros de pesquisa (nome)
- ✅ Criação de nova editora
- ✅ Edição de editora existente
- ✅ Visualização de detalhes
- ✅ Exclusão com confirmação

### 📖 CRUD de Livros
- ✅ Listagem com grid paginado
- ✅ Filtros avançados (título, subtítulo, ano, autor, editora)
- ✅ Criação de novo livro
- ✅ Edição de livro existente
- ✅ Visualização de detalhes completos
- ✅ Exclusão com confirmação
- ✅ Relacionamento com autores e editoras via dropdowns
- ✅ Campos: título, subtítulo, ano, edição, número de páginas

### 🧭 Navegação
- ✅ Navbar responsiva com menu principal
- ✅ Submenu de Manutenção (Categorias, Idiomas, Usuários)
- ✅ Roteamento com React Router v6
- ✅ Página inicial com boas-vindas

### 🎨 Interface UI/UX
- ✅ Design responsivo com Material-UI
- ✅ Tema customizado com paleta de cores
- ✅ MUI Data Grid com:
  - Paginação configurável (5, 10, 25, 50 itens)
  - Ordenação por colunas
  - Ações inline (Visualizar, Editar, Excluir)
- ✅ Formulários modais com validação
- ✅ Notificações toast (Snackbar)
- ✅ Feedback visual de loading
- ✅ Botões com ícones intuitivos

## 📁 Estrutura do Projeto

```
biblioteca-frontend-reactjs/
├── public/                 # Arquivos públicos
├── src/
│   ├── components/         # Componentes reutilizáveis
│   │   ├── Navbar.tsx     # Menu de navegação principal
│   │   ├── Loading.tsx    # Componente de carregamento
│   │   ├── ErrorMessage.tsx   # Exibição de erros
│   │   └── ConfirmDialog.tsx  # Diálogo de confirmação
│   │
│   ├── pages/             # Páginas da aplicação
│   │   ├── HomePage.tsx         # Página inicial
│   │   ├── AutoresPage.tsx      # CRUD de Autores
│   │   ├── EditorasPage.tsx     # CRUD de Editoras
│   │   ├── LivrosPage.tsx       # CRUD de Livros
│   │   ├── CategoriasPage.tsx   # Placeholder Categorias
│   │   ├── IdiomasPage.tsx      # Placeholder Idiomas
│   │   └── UsuariosPage.tsx     # Placeholder Usuários
│   │
│   ├── services/          # Serviços de API
│   │   ├── api.ts              # Configuração Axios
│   │   ├── autorService.ts     # Serviço de Autores
│   │   ├── editoraService.ts   # Serviço de Editoras
│   │   └── livroService.ts     # Serviço de Livros
│   │
│   ├── types/             # Tipos TypeScript
│   │   ├── autor.ts       # Tipos de Autor
│   │   ├── editora.ts     # Tipos de Editora
│   │   └── livro.ts       # Tipos de Livro
│   │
│   ├── App.tsx            # Componente raiz com rotas
│   ├── main.tsx           # Entry point
│   ├── index.css          # Estilos globais
│   └── vite-env.d.ts      # Tipos do Vite
│
├── .env                   # Variáveis de ambiente
├── .env.example           # Exemplo de variáveis
├── .gitignore             # Arquivos ignorados pelo Git
├── index.html             # HTML principal
├── package.json           # Dependências e scripts
├── tsconfig.json          # Configuração TypeScript
├── tsconfig.node.json     # Config TS para Node
├── vite.config.ts         # Configuração Vite
├── README.md              # Este arquivo
├── INSTALACAO.md          # Guia detalhado de instalação
└── install.sh             # Script de instalação

```

## 🔌 API Backend

Este frontend consome a API do backend NestJS localizada em `biblioteca-backend`.

### Endpoints Utilizados

**Autores:**
- `GET /autores` - Lista todos os autores (com filtros opcionais)
- `GET /autores/:id` - Busca autor por ID
- `POST /autores` - Cria novo autor
- `PATCH /autores/:id` - Atualiza autor
- `DELETE /autores/:id` - Remove autor

**Editoras:**
- `GET /editoras` - Lista todas as editoras (com filtros opcionais)
- `GET /editoras/:id` - Busca editora por ID
- `POST /editoras` - Cria nova editora
- `PATCH /editoras/:id` - Atualiza editora
- `DELETE /editoras/:id` - Remove editora

**Livros:**
- `GET /livros` - Lista todos os livros (com filtros opcionais)
- `GET /livros/:id` - Busca livro por ID
- `POST /livros` - Cria novo livro
- `PATCH /livros/:id` - Atualiza livro
- `DELETE /livros/:id` - Remove livro

### Configuração da API

Por padrão, a aplicação espera que o backend esteja rodando em:
```
http://localhost:3001
```

Para alterar, edite o arquivo `.env`:
```bash
VITE_API_URL=http://seu-servidor:porta
```

## 📝 Próximos Passos

Para implementar as páginas de manutenção pendentes:

1. **Categorias, Idiomas e Usuários**
   - Criar tipos em `src/types/`
   - Criar serviços em `src/services/`
   - Implementar CRUDs em `src/pages/`
   - Rotas já estão configuradas

2. **Autenticação**
   - Implementar página de login
   - Gerenciar token JWT
   - Proteger rotas

3. **Melhorias**
   - Adicionar testes unitários
   - Implementar lazy loading de rotas
   - Adicionar breadcrumbs
   - Cache de requisições

## 🐛 Troubleshooting

**Erro de CORS:**
- Verifique se o backend permite requisições de `http://localhost:3000`

**Erro de conexão com API:**
- Certifique-se de que o backend está rodando
- Verifique a URL no arquivo `.env`

**Erro ao instalar dependências:**
```bash
# Limpe o cache do npm
npm cache clean --force
# Tente novamente
npm install
```

## 📄 Licença

Este projeto foi desenvolvido para fins educacionais.

---

Desenvolvido com ❤️ usando React + TypeScript + Material-UI

