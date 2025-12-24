# Exemplos de Uso da API

## Importar Serviços

```typescript
import { autorService } from '../services/autorService';
import { editoraService } from '../services/editoraService';
import { livroService } from '../services/livroService';
```

## Autores

### Listar todos
```typescript
const autores = await autorService.getAll();
```

### Com filtros
```typescript
const autores = await autorService.getAll({
  nome: 'Machado',
  nacionalidade: 'Brasileiro'
});
```

### Buscar por ID
```typescript
const autor = await autorService.getById(1);
```

### Criar
```typescript
const novoAutor = await autorService.create({
  nome: 'Machado de Assis',
  nacionalidade: 'Brasileiro'
});
```

### Atualizar
```typescript
const autorAtualizado = await autorService.update(1, {
  nacionalidade: 'Brasil'
});
```

### Excluir
```typescript
await autorService.delete(1);
```

## Exemplo Completo em Componente

```typescript
import React, { useState, useEffect } from 'react';
import { autorService } from '../services/autorService';
import { Autor } from '../types/autor';

const MeuComponente: React.FC = () => {
  const [autores, setAutores] = useState<Autor[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadAutores();
  }, []);

  const loadAutores = async () => {
    setLoading(true);
    try {
      const data = await autorService.getAll();
      setAutores(data);
    } catch (error) {
      console.error('Erro ao carregar autores:', error);
    } finally {
      setLoading(false);
    }
  };

  return <div>{/* Seu JSX */}</div>;
};
```

Veja mais exemplos na documentação completa!
