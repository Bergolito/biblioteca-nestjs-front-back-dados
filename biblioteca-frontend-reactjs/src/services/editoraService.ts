import api from './api';
import { Editora, EditoraFilters } from '../types/editora';

export const editoraService = {
  getAll: async (filters?: EditoraFilters): Promise<Editora[]> => {
    const params = new URLSearchParams();
    if (filters?.nome) params.append('nome', filters.nome);
    
    const response = await api.get<Editora[]>(`/editoras?${params.toString()}`);
    return response.data;
  },

  getById: async (id: number): Promise<Editora> => {
    const response = await api.get<Editora>(`/editoras/${id}`);
    return response.data;
  },

  create: async (editora: Omit<Editora, 'id'>): Promise<Editora> => {
    const response = await api.post<Editora>('/editoras', editora);
    return response.data;
  },

  update: async (id: number, editora: Partial<Editora>): Promise<Editora> => {
    const response = await api.patch<Editora>(`/editoras/${id}`, editora);
    return response.data;
  },

  delete: async (id: number): Promise<void> => {
    await api.delete(`/editoras/${id}`);
  },
};
