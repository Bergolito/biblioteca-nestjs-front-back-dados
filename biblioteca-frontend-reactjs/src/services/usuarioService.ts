import api from './api';
import { Usuario, UsuarioFilters } from '../types/usuario';

export const usuarioService = {
  getAll: async (filters?: UsuarioFilters): Promise<Usuario[]> => {
    const params = new URLSearchParams();
    if (filters?.email) params.append('email', filters.email);
    if (filters?.nome) params.append('nome', filters.nome);
    if (filters?.telefone) params.append('telefone', filters.telefone);
    
    const response = await api.get<Usuario[]>(`/usuarios?${params.toString()}`);
    return response.data;
  },

  getById: async (id: number): Promise<Usuario> => {
    const response = await api.get<Usuario>(`/usuarios/${id}`);
    return response.data;
  },

  create: async (usuario: Omit<Usuario, 'id'>): Promise<Usuario> => {
    const response = await api.post<Usuario>('/usuarios', usuario);
    return response.data;
  },

  update: async (id: number, usuario: Partial<Usuario>): Promise<Usuario> => {
    const response = await api.patch<Usuario>(`/usuarios/${id}`, usuario);
    return response.data;
  },

  delete: async (id: number): Promise<void> => {
    await api.delete(`/usuarios/${id}`);
  },
};
