import api from './api';

interface LoginResponse {
  access_token: string;
  usuario: {
    id: number;
    email: string;
    nome: string;
  };
}

export const login = async (email: string, senha: string): Promise<LoginResponse> => {
  try {
    const response = await api.post<LoginResponse>('/auth/login', {
      email,
      senha,
    });
    return response.data;
  } catch (error: any) {
    if (error.response) {
      throw new Error(error.response.data.message || 'Erro ao fazer login');
    }
    throw new Error('Erro de conexão com o servidor');
  }
};

export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('usuario');
};

export const getToken = (): string | null => {
  return localStorage.getItem('token');
};

export const getUsuario = (): { id: number; email: string; nome: string } | null => {
  const usuario = localStorage.getItem('usuario');
  return usuario ? JSON.parse(usuario) : null;
};

export const isAuthenticated = (): boolean => {
  return !!getToken();
};
