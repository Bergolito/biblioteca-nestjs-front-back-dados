# Guia de Instalação - Biblioteca Frontend React

## Pré-requisitos

- Node.js (versão 18 ou superior)
- npm ou yarn
- Backend da biblioteca rodando na porta 3001

## Instalação

1. Entre no diretório do projeto:
```bash
cd biblioteca-frontend-reactjs
```

2. Instale as dependências:
```bash
npm install
```

3. Configure as variáveis de ambiente:
   - Copie o arquivo `.env.example` para `.env`
   - Ajuste a URL da API se necessário (padrão: http://localhost:3001)

## Executar em Desenvolvimento

```bash
npm run dev
```

O aplicativo estará disponível em: http://localhost:3000

## Build para Produção

```bash
npm run build
```

Os arquivos serão gerados na pasta `dist/`

## Preview do Build

```bash
npm run preview
```

## Estrutura do Projeto

```
src/
├── components/         # Componentes reutilizáveis
│   └── Navbar.tsx     # Menu de navegação
├── pages/             # Páginas da aplicação
│   ├── HomePage.tsx
│   ├── AutoresPage.tsx
│   ├── EditorasPage.tsx
│   ├── LivrosPage.tsx
│   ├── CategoriasPage.tsx
│   ├── IdiomasPage.tsx
│   └── UsuariosPage.tsx
├── services/          # Serviços de API
│   ├── api.ts
│   ├── autorService.ts
│   ├── editoraService.ts
│   └── livroService.ts
├── types/             # Tipos TypeScript
│   ├── autor.ts
│   ├── editora.ts
│   └── livro.ts
├── App.tsx            # Componente principal
└── main.tsx           # Ponto de entrada

```

## Funcionalidades Implementadas

### CRUD de Autores
- ✅ Listagem com filtros (nome, nacionalidade)
- ✅ Criação de novo autor
- ✅ Edição de autor existente
- ✅ Visualização de detalhes
- ✅ Exclusão de autor

### CRUD de Editoras
- ✅ Listagem com filtros (nome)
- ✅ Criação de nova editora
- ✅ Edição de editora existente
- ✅ Visualização de detalhes
- ✅ Exclusão de editora

### CRUD de Livros
- ✅ Listagem com filtros (título, subtítulo, ano, autor, editora)
- ✅ Criação de novo livro
- ✅ Edição de livro existente
- ✅ Visualização de detalhes
- ✅ Exclusão de livro
- ✅ Relacionamento com autores e editoras

### Navegação
- ✅ Navbar com menu principal
- ✅ Submenu de Manutenção (Categorias, Idiomas, Usuários)
- ✅ Roteamento com React Router

### Componentes UI
- ✅ Material-UI para componentes
- ✅ MUI X Data Grid para tabelas
- ✅ Formulários com validação
- ✅ Diálogos modais
- ✅ Notificações (Snackbar)
- ✅ Tema customizado

## Tecnologias Utilizadas

- **React 18** - Biblioteca UI
- **TypeScript** - Tipagem estática
- **Material-UI (MUI)** - Componentes UI
- **MUI X Data Grid** - Tabelas avançadas
- **React Router DOM** - Roteamento
- **Axios** - Cliente HTTP
- **Vite** - Build tool

## Próximos Passos

Para implementar as páginas de manutenção (Categorias, Idiomas, Usuários), siga o mesmo padrão dos CRUDs já implementados:

1. Criar tipos em `src/types/`
2. Criar serviços em `src/services/`
3. Criar páginas em `src/pages/`
4. As rotas já estão configuradas no `App.tsx`

## Observações

- Certifique-se de que o backend está rodando antes de iniciar o frontend
- As requisições são feitas para `http://localhost:3001` por padrão
- A autenticação por JWT está configurada mas não implementada nas telas
- Para adicionar autenticação, crie uma página de login e use o token armazenado no localStorage
