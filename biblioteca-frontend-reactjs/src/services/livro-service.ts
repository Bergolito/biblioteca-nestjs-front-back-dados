import api from './api';
import { Livro, LivroFilters } from '../types/livro';

export const livroService = {
    

  getAll: async (filters?: LivroFilters): Promise<Livro[]> => {
    const params = new URLSearchParams();
    if (filters?.titulo) params.append('titulo', filters.titulo);
    if (filters?.subtitulo) params.append('subtitulo', filters.subtitulo);
    if (filters?.ano) params.append('ano', filters.ano.toString());
    if (filters?.autor_id) params.append('autor_id', filters.autor_id.toString());
    if (filters?.editora_id) params.append('editora_id', filters.editora_id.toString());
    if (filters?.idioma_id) params.append('idioma_id', filters.idioma_id.toString());
    
    console.log('livros-getAll() with params:', params.toString());

    const response = await api.get<Livro[]>(`/livros?${params.toString()}`);
    return response.data;
  },

  getById: async (id: number): Promise<Livro> => {
    const response = await api.get<Livro>(`/livros/${id}`);
    return response.data;
  },

  create: async (livro: Omit<Livro, 'id'>): Promise<Livro> => {
    const response = await api.post<Livro>('/livros', livro);
    return response.data;
  },

  update: async (id: number, livro: Partial<Livro>): Promise<Livro> => {
    const response = await api.patch<Livro>(`/livros/${id}`, livro);
    return response.data;
  },

  delete: async (id: number): Promise<void> => {
    await api.delete(`/livros/${id}`);
  },
};
