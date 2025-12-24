# 🏗️ Arquitetura do Sistema

## Visão Geral

```
┌─────────────────────────────────────────────────────────────┐
│                     NAVEGADOR (Browser)                      │
│                    http://localhost:3000                     │
└─────────────────────────────────────────────────────────────┘
                              │
                              │ HTTP Requests
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                   FRONTEND REACT + TypeScript                │
│                          (Vite)                              │
├─────────────────────────────────────────────────────────────┤
│  ┌────────────────────────────────────────────────────┐    │
│  │              COMPONENTES (Components)              │    │
│  ├────────────────────────────────────────────────────┤    │
│  │  • Navbar          → Menu de navegação             │    │
│  │  • Loading         → Indicador de carregamento     │    │
│  │  • ErrorMessage    → Mensagens de erro             │    │
│  │  • ConfirmDialog   → Diálogos de confirmação       │    │
│  └────────────────────────────────────────────────────┘    │
│                                                             │
│  ┌────────────────────────────────────────────────────┐    │
│  │                 PÁGINAS (Pages)                    │    │
│  ├────────────────────────────────────────────────────┤    │
│  │  • HomePage        → Página inicial                │    │
│  │  • AutoresPage     → CRUD de Autores              │    │
│  │  • EditorasPage    → CRUD de Editoras             │    │
│  │  • LivrosPage      → CRUD de Livros               │    │
│  │  • CategoriasPage  → Placeholder                   │    │
│  │  • IdiomasPage     → Placeholder                   │    │
│  │  • UsuariosPage    → Placeholder                   │    │
│  └────────────────────────────────────────────────────┘    │
│                              │                              │
│                              │ Usa                          │
│                              ▼                              │
│  ┌────────────────────────────────────────────────────┐    │
│  │              SERVIÇOS (Services)                   │    │
│  ├────────────────────────────────────────────────────┤    │
│  │  • api.ts            → Config Axios + Interceptors │    │
│  │  • autorService      → API de Autores              │    │
│  │  • editoraService    → API de Editoras             │    │
│  │  • livroService      → API de Livros               │    │
│  └────────────────────────────────────────────────────┘    │
│                              │                              │
│                              │ Define                       │
│                              ▼                              │
│  ┌────────────────────────────────────────────────────┐    │
│  │               TIPOS (TypeScript)                   │    │
│  ├────────────────────────────────────────────────────┤    │
│  │  • autor.ts          → Autor, AutorFilters         │    │
│  │  • editora.ts        → Editora, EditoraFilters     │    │
│  │  • livro.ts          → Livro, LivroFilters         │    │
│  └────────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────────┘
                              │
                              │ HTTP/REST (Axios)
                              │ http://localhost:3001
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                    BACKEND NestJS API                        │
│                    http://localhost:3001                     │
├─────────────────────────────────────────────────────────────┤
│  Endpoints:                                                  │
│  • GET    /autores                                          │
│  • POST   /autores                                          │
│  • GET    /autores/:id                                      │
│  • PATCH  /autores/:id                                      │
│  • DELETE /autores/:id                                      │
│                                                             │
│  • GET    /editoras                                         │
│  • POST   /editoras                                         │
│  • ...                                                      │
│                                                             │
│  • GET    /livros                                           │
│  • POST   /livros                                           │
│  • ...                                                      │
└─────────────────────────────────────────────────────────────┘
                              │
                              │ TypeORM
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                   BANCO DE DADOS (PostgreSQL)                │
│                                                             │
│  Tabelas:                                                   │
│  • autores                                                  │
│  • editoras                                                 │
│  • livros                                                   │
│  • categorias                                               │
│  • idiomas                                                  │
│  • usuarios                                                 │
└─────────────────────────────────────────────────────────────┘
```

## Fluxo de Dados

### 1. Carregar Dados (READ)

```
Usuario clica em "Autores"
        ↓
AutoresPage.tsx (useEffect)
        ↓
autorService.getAll()
        ↓
api.ts (Axios GET)
        ↓
Backend: GET /autores
        ↓
TypeORM → PostgreSQL
        ↓
Backend retorna JSON
        ↓
Frontend recebe dados
        ↓
setAutores(data)
        ↓
DataGrid exibe dados
```

### 2. Criar Registro (CREATE)

```
Usuario clica "Novo Autor"
        ↓
Modal abre (dialogMode = 'create')
        ↓
Usuario preenche formulário
        ↓
Usuario clica "Salvar"
        ↓
autorService.create(data)
        ↓
api.ts (Axios POST)
        ↓
Backend: POST /autores
        ↓
TypeORM → PostgreSQL
        ↓
Backend retorna registro criado
        ↓
Frontend mostra notificação
        ↓
loadAutores() para atualizar grid
```

### 3. Atualizar Registro (UPDATE)

```
Usuario clica ícone "Editar"
        ↓
Modal abre (dialogMode = 'edit')
        ↓
Usuario modifica campos
        ↓
Usuario clica "Salvar"
        ↓
autorService.update(id, data)
        ↓
api.ts (Axios PATCH)
        ↓
Backend: PATCH /autores/:id
        ↓
TypeORM → PostgreSQL
        ↓
Backend retorna registro atualizado
        ↓
Frontend mostra notificação
        ↓
loadAutores() para atualizar grid
```

### 4. Excluir Registro (DELETE)

```
Usuario clica ícone "Excluir"
        ↓
window.confirm("Tem certeza?")
        ↓
Usuario confirma
        ↓
autorService.delete(id)
        ↓
api.ts (Axios DELETE)
        ↓
Backend: DELETE /autores/:id
        ↓
TypeORM → PostgreSQL
        ↓
Backend retorna status 200
        ↓
Frontend mostra notificação
        ↓
loadAutores() para atualizar grid
```

## Estrutura de Pastas

```
biblioteca-frontend-reactjs/
│
├── public/                    # Arquivos estáticos
│
├── src/                       # Código fonte
│   │
│   ├── components/            # Componentes reutilizáveis
│   │   ├── Navbar.tsx
│   │   ├── Loading.tsx
│   │   ├── ErrorMessage.tsx
│   │   └── ConfirmDialog.tsx
│   │
│   ├── pages/                 # Páginas/Rotas
│   │   ├── HomePage.tsx
│   │   ├── AutoresPage.tsx
│   │   ├── EditorasPage.tsx
│   │   ├── LivrosPage.tsx
│   │   ├── CategoriasPage.tsx
│   │   ├── IdiomasPage.tsx
│   │   └── UsuariosPage.tsx
│   │
│   ├── services/              # Comunicação API
│   │   ├── api.ts             # Config Axios base
│   │   ├── autorService.ts
│   │   ├── editoraService.ts
│   │   └── livroService.ts
│   │
│   ├── types/                 # Tipos TypeScript
│   │   ├── autor.ts
│   │   ├── editora.ts
│   │   └── livro.ts
│   │
│   ├── App.tsx                # Componente raiz + rotas
│   ├── main.tsx               # Entry point
│   ├── index.css              # Estilos globais
│   └── vite-env.d.ts          # Tipos Vite
│
├── .env                       # Variáveis de ambiente
├── .env.example               # Template
├── .gitignore                 # Git ignore
├── index.html                 # HTML principal
├── package.json               # Dependências
├── tsconfig.json              # Config TypeScript
├── vite.config.ts             # Config Vite
│
└── docs/                      # Documentação
    ├── README.md
    ├── INSTALACAO.md
    ├── EXEMPLOS_API.md
    ├── CONFIGURACAO_CORS.md
    ├── INICIO_RAPIDO.md
    ├── RESUMO.md
    └── ARQUITETURA.md
```

## Tecnologias e Responsabilidades

### Frontend

| Tecnologia | Responsabilidade |
|-----------|------------------|
| **React** | Gerenciamento de UI e estado |
| **TypeScript** | Tipagem estática e segurança |
| **Material-UI** | Componentes de interface |
| **MUI Data Grid** | Tabelas com filtros e paginação |
| **React Router** | Navegação entre páginas |
| **Axios** | Requisições HTTP |
| **Vite** | Build e desenvolvimento rápido |

### Backend (NestJS)

| Camada | Responsabilidade |
|--------|------------------|
| **Controllers** | Recebe requisições HTTP |
| **Services** | Lógica de negócio |
| **Entities** | Modelos de dados |
| **DTOs** | Validação de dados |
| **TypeORM** | ORM para banco de dados |

## Padrões de Projeto

### Frontend

1. **Component Pattern** - Componentes reutilizáveis
2. **Service Pattern** - Comunicação com API
3. **Type Safety** - TypeScript em toda a aplicação
4. **Controlled Components** - Formulários controlados
5. **Hook Pattern** - useState, useEffect

### Comunicação API

1. **RESTful** - Verbos HTTP (GET, POST, PATCH, DELETE)
2. **JSON** - Formato de dados
3. **Axios Interceptors** - Autenticação e tratamento de erros
4. **Promise/Async-Await** - Programação assíncrona

## Segurança

### Implementado
- ✅ CORS configurado no backend
- ✅ TypeScript para type safety
- ✅ Validação de dados (DTOs no backend)

### Recomendado para Produção
- 🔶 Autenticação JWT
- 🔶 Proteção de rotas
- 🔶 HTTPS
- 🔶 Rate limiting
- 🔶 Sanitização de inputs
- 🔶 Proteção CSRF

## Performance

### Otimizações Implementadas
- ✅ Paginação de dados no grid
- ✅ Lazy loading de componentes
- ✅ Vite para builds rápidos

### Possíveis Melhorias
- 🔶 React.memo para componentes
- 🔶 useMemo e useCallback
- 🔶 Code splitting
- 🔶 Cache de requisições
- 🔶 Debounce em filtros

---

Esta arquitetura segue as melhores práticas de desenvolvimento frontend moderno!
