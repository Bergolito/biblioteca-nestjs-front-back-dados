export interface Usuario {
  id: number;
  email: string;
  nome: string;
  senha?: string;
  endereco?: string;
  data_nasc?: Date | string;
  sexo?: string;
  telefone?: string;
}

export interface UsuarioFilters {
  email?: string;
  nome?: string;
  telefone?: string;
}
