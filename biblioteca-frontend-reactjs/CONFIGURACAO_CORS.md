# Configuração CORS no Backend

Para que o frontend React (porta 3000) consiga se comunicar com o backend NestJS (porta 3001), é necessário configurar o CORS.

## No Backend NestJS

Edite o arquivo `main.ts` do backend:

```typescript
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Habilitar CORS
  app.enableCors({
    origin: 'http://localhost:3000', // URL do frontend
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
    allowedHeaders: 'Content-Type, Accept, Authorization',
  });

  await app.listen(3001);
}
bootstrap();
```

## Opção Alternativa (Mais Permissiva - Apenas para Desenvolvimento)

```typescript
app.enableCors({
  origin: '*', // Permite qualquer origem
  credentials: true,
});
```

⚠️ **Atenção:** A opção `origin: '*'` é insegura para produção!

## Para Produção

Configure origens específicas:

```typescript
app.enableCors({
  origin: [
    'http://localhost:3000',      // Desenvolvimento
    'https://seu-dominio.com',    // Produção
  ],
  credentials: true,
});
```

## Verificar se CORS está Funcionando

1. Inicie o backend
2. Inicie o frontend
3. Abra o Console do navegador (F12)
4. Se houver erro de CORS, você verá:
   ```
   Access to XMLHttpRequest at 'http://localhost:3001/autores' 
   from origin 'http://localhost:3000' has been blocked by CORS policy
   ```

## Testando CORS

Use o comando curl para testar:

```bash
curl -H "Origin: http://localhost:3000" \
     -H "Access-Control-Request-Method: GET" \
     -H "Access-Control-Request-Headers: Content-Type" \
     -X OPTIONS \
     --verbose \
     http://localhost:3001/autores
```

Você deve ver nos headers da resposta:
```
Access-Control-Allow-Origin: http://localhost:3000
Access-Control-Allow-Methods: GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS
```

## Arquivo main.ts Completo do Backend

```typescript
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Habilitar CORS
  app.enableCors({
    origin: 'http://localhost:3000',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
    allowedHeaders: 'Content-Type, Accept, Authorization',
  });

  // Validação global
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  // Prefixo global para todas as rotas (opcional)
  // app.setGlobalPrefix('api');

  const port = process.env.PORT || 3001;
  await app.listen(port);
  
  console.log(`Application is running on: http://localhost:${port}`);
}
bootstrap();
```

## Troubleshooting

### Erro persiste após configurar CORS

1. **Limpe o cache do navegador**
   - Chrome: Ctrl+Shift+Delete
   - Ou use modo anônimo

2. **Reinicie o servidor backend**
   ```bash
   npm run start:dev
   ```

3. **Verifique se o backend está rodando na porta correta**
   ```bash
   netstat -an | grep 3001
   # ou
   lsof -i :3001
   ```

4. **Verifique se há proxy reverso ou firewall bloqueando**

### Erro 404 nas requisições

Verifique se as rotas do backend estão corretas:
- `/autores` (não `/autor`)
- `/editoras` (não `/editora`)
- `/livros` (não `/livro`)

### Prefixo Global

Se o backend usa prefixo global (ex: `/api`):

1. **No backend:**
   ```typescript
   app.setGlobalPrefix('api');
   ```

2. **No frontend (.env):**
   ```
   VITE_API_URL=http://localhost:3001/api
   ```

## Headers Personalizados

Se precisar de headers customizados:

```typescript
app.enableCors({
  origin: 'http://localhost:3000',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
  credentials: true,
  allowedHeaders: [
    'Content-Type',
    'Accept',
    'Authorization',
    'X-Custom-Header', // Seu header customizado
  ],
  exposedHeaders: ['X-Custom-Response-Header'],
});
```

## Múltiplos Frontends

Se tiver múltiplos frontends:

```typescript
app.enableCors({
  origin: [
    'http://localhost:3000',  // React frontend
    'http://localhost:4200',  // Angular frontend
    'http://localhost:5173',  // Vite dev server
  ],
  credentials: true,
});
```

## Função de Callback para Origem Dinâmica

Para controle mais granular:

```typescript
app.enableCors({
  origin: (origin, callback) => {
    const whitelist = [
      'http://localhost:3000',
      'http://localhost:5173',
      'https://seu-dominio.com',
    ];
    
    if (!origin || whitelist.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
});
```

---

✅ Após configurar corretamente o CORS, o frontend poderá se comunicar com o backend sem problemas!
