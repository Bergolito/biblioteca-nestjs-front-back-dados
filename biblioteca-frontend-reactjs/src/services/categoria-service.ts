import api from './api';
import { Categoria, CategoriaFilters } from '../types/categoria';

export const categoriaService = {
    
  getAll: async (filters?: CategoriaFilters): Promise<Categoria[]> => {
    const params = new URLSearchParams();
    if (filters?.nome) params.append('nome', filters.nome);
    if (filters?.descricao) params.append('descricao', filters.descricao);
    
    const response = await api.get<Categoria[]>(`/categorias?${params.toString()}`);
    return response.data;
  },

  getById: async (id: number): Promise<Categoria> => {
    const response = await api.get<Categoria>(`/categorias/${id}`);
    return response.data;
  },

  create: async (categoria: Omit<Categoria, 'id'>): Promise<Categoria> => {
    const response = await api.post<Categoria>('/categorias', categoria);
    return response.data;
  },

  update: async (id: number, categoria: Partial<Categoria>): Promise<Categoria> => {
    const response = await api.patch<Categoria>(`/categorias/${id}`, categoria);
    return response.data;
  },

  delete: async (id: number): Promise<void> => {
    await api.delete(`/categorias/${id}`);
  },
};
