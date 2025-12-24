export interface Autor {
  id: number;
  nome: string;
  nacionalidade?: string;
}

export interface AutorFilters {
  nome?: string;
  nacionalidade?: string;
}
