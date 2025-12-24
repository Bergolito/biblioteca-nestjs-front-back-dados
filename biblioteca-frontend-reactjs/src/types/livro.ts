import { Autor } from './autor';
import { Editora } from './editora';

export interface Idioma {
  id: number;
  nome: string;
}

export interface Livro {
  id: number;
  titulo: string;
  subtitulo?: string;
  edicao?: number;
  num_paginas?: number;
  ano?: number;
  autor_id?: number;
  editora_id?: number;
  idioma_id?: number;
  autor?: Autor;
  editora?: Editora;
  idioma?: Idioma;
}

export interface LivroFilters {
  titulo?: string;
  subtitulo?: string;
  ano?: number;
  autor_id?: number;
  editora_id?: number;
  idioma_id?: number;
}
