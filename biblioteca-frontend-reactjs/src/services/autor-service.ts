import api from './api';
import { Autor, AutorFilters } from '../types/autor';

export const autorService = {
    
  getAll: async (filters?: AutorFilters): Promise<Autor[]> => {
    const params = new URLSearchParams();
    if (filters?.nome) params.append('nome', filters.nome);
    if (filters?.nacionalidade) params.append('nacionalidade', filters.nacionalidade);
    
    const response = await api.get<Autor[]>(`/autores?${params.toString()}`);
    return response.data;
  },

  getById: async (id: number): Promise<Autor> => {
    const response = await api.get<Autor>(`/autores/${id}`);
    return response.data;
  },

  create: async (autor: Omit<Autor, 'id'>): Promise<Autor> => {
    const response = await api.post<Autor>('/autores', autor);
    return response.data;
  },

  update: async (id: number, autor: Partial<Autor>): Promise<Autor> => {
    const response = await api.patch<Autor>(`/autores/${id}`, autor);
    return response.data;
  },

  delete: async (id: number): Promise<void> => {
    await api.delete(`/autores/${id}`);
  },
};
