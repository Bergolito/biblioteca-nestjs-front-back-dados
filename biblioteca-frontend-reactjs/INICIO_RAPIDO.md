# 🚀 Guia Rápido de Início

## Pré-requisitos

- ✅ Node.js 18+
- ✅ Backend rodando (porta 3001)

## Instalação Rápida

```bash
# 1. Entre no diretório
cd biblioteca-frontend-reactjs

# 2. Instale as dependências
npm install

# 3. Execute o projeto
npm run dev
```

Acesse: **http://localhost:3000**

## Ou use o script automático:

```bash
./install.sh
```

## Estrutura Rápida

```
📦 biblioteca-frontend-reactjs
 ├── 📂 src
 │   ├── 📂 components    → Componentes reutilizáveis
 │   ├── 📂 pages         → Páginas (CRUDs)
 │   ├── 📂 services      → Comunicação com API
 │   └── 📂 types         → Tipos TypeScript
 ├── 📄 package.json      → Dependências
 ├── 📄 vite.config.ts    → Configuração Vite
 └── 📄 .env              → Variáveis de ambiente
```

## Funcionalidades Prontas

✅ CRUD de Autores (nome, nacionalidade)
✅ CRUD de Editoras (nome)
✅ CRUD de Livros (título, subtítulo, ano, edição, páginas, autor, editora)
✅ Filtros de pesquisa
✅ Grid com paginação
✅ Ações: Visualizar, Editar, Excluir
✅ Menu de navegação

## Scripts Disponíveis

```bash
npm run dev      # Desenvolvimento (porta 3000)
npm run build    # Build para produção
npm run preview  # Preview do build
```

## Configuração

Arquivo `.env`:
```
VITE_API_URL=http://localhost:3001
```

## Tecnologias

- React 18 + TypeScript
- Material-UI (MUI)
- React Router DOM
- Axios
- Vite

## Documentação

- 📘 **README.md** - Documentação completa
- 📗 **INSTALACAO.md** - Guia de instalação
- 📙 **EXEMPLOS_API.md** - Exemplos de código
- 📕 **CONFIGURACAO_CORS.md** - Configurar CORS
- 📔 **RESUMO.md** - Resumo do projeto

## Problemas Comuns

### Backend não responde
```bash
# Verifique se o backend está rodando
curl http://localhost:3001/autores
```

### Erro de CORS
O backend já tem CORS configurado, mas se houver problemas, consulte `CONFIGURACAO_CORS.md`

### Erro ao instalar
```bash
# Limpe o cache e tente novamente
npm cache clean --force
npm install
```

## Primeiro Acesso

1. Acesse http://localhost:3000
2. Você verá a página inicial
3. Use o menu para navegar:
   - **Autores** → CRUD completo
   - **Editoras** → CRUD completo
   - **Livros** → CRUD completo
   - **Manutenção** → Placeholders (Categorias, Idiomas, Usuários)

## Testando a Aplicação

### 1. Criar um Autor
- Vá em **Autores**
- Clique em **Novo Autor**
- Preencha: Nome e Nacionalidade
- Clique em **Salvar**

### 2. Criar uma Editora
- Vá em **Editoras**
- Clique em **Nova Editora**
- Preencha: Nome
- Clique em **Salvar**

### 3. Criar um Livro
- Vá em **Livros**
- Clique em **Novo Livro**
- Preencha os campos
- Selecione Autor e Editora
- Clique em **Salvar**

### 4. Pesquisar
- Use os filtros no topo
- Clique em **Pesquisar**
- Clique em **Limpar** para resetar

### 5. Editar/Excluir
- Use os ícones na coluna **Ações**:
  - 👁️ Visualizar
  - ✏️ Editar
  - 🗑️ Excluir

## Dicas

💡 O grid é paginado - mude o tamanho da página no rodapé
💡 Clique nos cabeçalhos para ordenar
💡 Notificações aparecem no canto superior direito
💡 Use ESC para fechar modais

## Próximos Passos

Para implementar as páginas de manutenção (Categorias, Idiomas, Usuários):

1. Copie o padrão de `AutoresPage.tsx`
2. Crie os tipos em `src/types/`
3. Crie os serviços em `src/services/`
4. Crie a página em `src/pages/`
5. As rotas já estão configuradas!

---

✨ **Projeto pronto para uso!**
🎯 **Siga a documentação completa no README.md**
💬 **Dúvidas? Consulte os outros arquivos .md**
