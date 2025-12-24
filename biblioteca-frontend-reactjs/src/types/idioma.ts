export interface Idioma {
  id: number;
  codigo: string;
  descricao?: string;
}

export interface IdiomaFilters {
  codigo?: string;
  descricao?: string;
}
