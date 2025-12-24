import api from './api';
import { Idioma, IdiomaFilters } from '../types/idioma';

export const idiomaService = {
    
  getAll: async (filters?: IdiomaFilters): Promise<Idioma[]> => {
    const params = new URLSearchParams();
    if (filters?.codigo) params.append('codigo', filters.codigo);
    if (filters?.descricao) params.append('descricao', filters.descricao);
    
    const response = await api.get<Idioma[]>(`/idiomas?${params.toString()}`);
    return response.data;
  },

  getById: async (id: number): Promise<Idioma> => {
    const response = await api.get<Idioma>(`/idiomas/${id}`);
    return response.data;
  },

  create: async (idioma: Omit<Idioma, 'id'>): Promise<Idioma> => {
    const response = await api.post<Idioma>('/idiomas', idioma);
    return response.data;
  },

  update: async (id: number, idioma: Partial<Idioma>): Promise<Idioma> => {
    const response = await api.patch<Idioma>(`/idiomas/${id}`, idioma);
    return response.data;
  },

  delete: async (id: number): Promise<void> => {
    await api.delete(`/idiomas/${id}`);
  },
};
