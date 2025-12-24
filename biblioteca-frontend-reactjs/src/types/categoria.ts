export interface Categoria {
  id: number;
  nome: string;
  descricao?: string;
}

export interface CategoriaFilters {
  nome?: string;
  descricao?: string;
}
