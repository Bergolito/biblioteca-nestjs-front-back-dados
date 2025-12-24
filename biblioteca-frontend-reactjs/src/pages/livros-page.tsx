import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Paper,
  TextField,
  Button,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Grid,
  Alert,
  Snackbar,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from '@mui/material';
import { DataGrid, GridColDef, GridActionsCellItem } from '@mui/x-data-grid';
import { Edit, Delete, Visibility } from '@mui/icons-material';
import { livroService } from '../services/livro-service';
import { autorService } from '../services/autor-service';
import { editoraService } from '../services/editora-service';
import { idiomaService } from '../services/idioma-service';
import { Livro, LivroFilters } from '../types/livro';
import { Autor } from '../types/autor';
import { Editora } from '../types/editora';
import { Idioma } from '../types/idioma';

const LivrosPage: React.FC = () => {
  const [livros, setLivros] = useState<Livro[]>([]);
  const [autores, setAutores] = useState<Autor[]>([]);
  const [editoras, setEditoras] = useState<Editora[]>([]);
  const [idiomas, setIdiomas] = useState<Idioma[]>([]);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState<LivroFilters>({});
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogMode, setDialogMode] = useState<'view' | 'edit' | 'create'>('view');
  const [selectedLivro, setSelectedLivro] = useState<Livro | null>(null);
  const [formData, setFormData] = useState<Partial<Livro>>({});
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' as 'success' | 'error' });

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'titulo', headerName: 'Título', flex: 1, minWidth: 200 },
    { field: 'subtitulo', headerName: 'Subtítulo', flex: 1, minWidth: 150 },
    { field: 'ano', headerName: 'Ano', width: 90 },
    { field: 'edicao', headerName: 'Edição', width: 90 },
    { field: 'num_paginas', headerName: 'Páginas', width: 100 },
    {
      field: 'autor',
      headerName: 'Autor',
      flex: 1,
      minWidth: 150,
      valueGetter: (params) => params.row.autor?.nome || '-',
    },
    {
      field: 'editora',
      headerName: 'Editora',
      flex: 1,
      minWidth: 150,
      valueGetter: (params) => params.row.editora?.nome || '-',
    },
    {
      field: 'idioma',
      headerName: 'Idioma',
      width: 120,
      valueGetter: (params) => params.row.idioma?.codigo || '-',
    },
    {
      field: 'actions',
      type: 'actions',
      headerName: 'Ações',
      width: 150,
      getActions: (params) => [
        <GridActionsCellItem
          icon={<Visibility />}
          label="Detalhar"
          onClick={() => handleView(params.row)}
        />,
        <GridActionsCellItem
          icon={<Edit />}
          label="Editar"
          onClick={() => handleEdit(params.row)}
        />,
        <GridActionsCellItem
          icon={<Delete />}
          label="Excluir"
          onClick={() => handleDelete(params.row.id)}
        />,
      ],
    },
  ];

  useEffect(() => {
    loadInitialData();
  }, []);

  const loadInitialData = async () => {
    await Promise.all([loadLivros(), loadAutores(), loadEditoras(), loadIdiomas()]);
  };

  const loadLivros = async (searchFilters?: LivroFilters) => {
    console.log('Carregando livros com filtros:', searchFilters);

    setLoading(true);
    try {
      const data = await livroService.getAll(searchFilters);
      // Valida se os dados retornados são um array e têm IDs válidos
      if (Array.isArray(data)) {
        const validData = data.filter(item => item && typeof item.id !== 'undefined');
        setLivros(validData);
      } else {
        console.error('Dados inválidos recebidos da API:', data);
        setLivros([]);
        showSnackbar('Formato de dados inválido recebido da API', 'error');
      }
    } catch (error) {
      console.error('Erro ao carregar livros:', error);
      setLivros([]);
      showSnackbar('Erro ao carregar livros', 'error');
    } finally {
      setLoading(false);
    }
  };

  const loadAutores = async () => {
    try {
      const data = await autorService.getAll();
      if (Array.isArray(data)) {
        const validData = data.filter(item => item && typeof item.id !== 'undefined');
        setAutores(validData);
      } else {
        setAutores([]);
      }
    } catch (error) {
      console.error('Erro ao carregar autores', error);
      setAutores([]);
    }
  };

  const loadEditoras = async () => {
    try {
      const data = await editoraService.getAll();
      if (Array.isArray(data)) {
        const validData = data.filter(item => item && typeof item.id !== 'undefined');
        setEditoras(validData);
      } else {
        setEditoras([]);
      }
    } catch (error) {
      console.error('Erro ao carregar editoras', error);
      setEditoras([]);
    }
  };

  const loadIdiomas = async () => {
    try {
      const data = await idiomaService.getAll();
      if (Array.isArray(data)) {
        const validData = data.filter(item => item && typeof item.id !== 'undefined');
        setIdiomas(validData);
      } else {
        setIdiomas([]);
      }
    } catch (error) {
      console.error('Erro ao carregar idiomas', error);
      setIdiomas([]);
    }
  };

  const handleSearch = () => {
    loadLivros(filters);
  };

  const handleClear = () => {
    setFilters({});
    loadLivros();
  };

  const handleView = (livro: Livro) => {
    setSelectedLivro(livro);
    setFormData(livro);
    setDialogMode('view');
    setOpenDialog(true);
  };

  const handleEdit = (livro: Livro) => {
    setSelectedLivro(livro);
    setFormData(livro);
    setDialogMode('edit');
    setOpenDialog(true);
  };

  const handleCreate = () => {
    setSelectedLivro(null);
    setFormData({});
    setDialogMode('create');
    setOpenDialog(true);
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('Tem certeza que deseja excluir este livro?')) {
      try {
        await livroService.delete(id);
        showSnackbar('Livro excluído com sucesso', 'success');
        loadLivros(filters);
      } catch (error) {
        showSnackbar('Erro ao excluir livro', 'error');
      }
    }
  };

  const handleSave = async () => {
    try {
      if (dialogMode === 'create') {
        await livroService.create(formData as Omit<Livro, 'id'>);
        showSnackbar('Livro criado com sucesso', 'success');
      } else if (dialogMode === 'edit' && selectedLivro) {
        await livroService.update(selectedLivro.id, formData);
        showSnackbar('Livro atualizado com sucesso', 'success');
      }
      setOpenDialog(false);
      loadLivros(filters);
    } catch (error) {
      showSnackbar('Erro ao salvar livro', 'error');
    }
  };

  const showSnackbar = (message: string, severity: 'success' | 'error') => {
    setSnackbar({ open: true, message, severity });
  };

  return (
    <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" gutterBottom>
        Livros
      </Typography>

      {/* Filtros */}
      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          Filtros de Pesquisa
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Título"
              value={filters.titulo || ''}
              onChange={(e) => setFilters({ ...filters, titulo: e.target.value })}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Subtítulo"
              value={filters.subtitulo || ''}
              onChange={(e) => setFilters({ ...filters, subtitulo: e.target.value })}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              label="Ano"
              type="number"
              value={filters.ano || ''}
              onChange={(e) => setFilters({ ...filters, ano: e.target.value ? parseInt(e.target.value) : undefined })}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <FormControl fullWidth>
              <InputLabel>Autor</InputLabel>
              <Select
                value={filters.autor_id || ''}
                label="Autor"
                onChange={(e) => setFilters({ ...filters, autor_id: e.target.value as number })}
              >
                <MenuItem value="">Todos</MenuItem>
                {autores.map((autor) => (
                  <MenuItem key={autor.id} value={autor.id}>
                    {autor.nome}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={4}>
            <FormControl fullWidth>
              <InputLabel>Editora</InputLabel>
              <Select
                value={filters.editora_id || ''}
                label="Editora"
                onChange={(e) => setFilters({ ...filters, editora_id: e.target.value as number })}
              >
                <MenuItem value="">Todas</MenuItem>
                {editoras.map((editora) => (
                  <MenuItem key={editora.id} value={editora.id}>
                    {editora.nome}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={4}>
            <FormControl fullWidth>
              <InputLabel>Idioma</InputLabel>
              <Select
                value={filters.idioma_id || ''}
                label="Idioma"
                onChange={(e) => setFilters({ ...filters, idioma_id: e.target.value as number })}
              >
                <MenuItem value="">Todos</MenuItem>
                {idiomas.map((idioma) => (
                  <MenuItem key={idioma.id} value={idioma.id}>
                    {idioma.codigo} - {idioma.descricao}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <Button variant="contained" onClick={handleSearch}>
                Pesquisar
              </Button>
              <Button variant="outlined" onClick={handleClear}>
                Limpar
              </Button>
              <Button variant="contained" color="success" onClick={handleCreate}>
                Novo Livro
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Paper>

      {/* Grid */}
      <Paper sx={{ p: 2, height: 500 }}>
        <DataGrid
          rows={livros}
          columns={columns}
          loading={loading}
          pageSizeOptions={[5, 10, 25, 50]}
          initialState={{
            pagination: { paginationModel: { pageSize: 25 } },
          }}
        />
      </Paper>

      {/* Dialog */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="md" fullWidth>
        <DialogTitle>
          {dialogMode === 'view' ? 'Detalhes do Livro' : dialogMode === 'edit' ? 'Editar Livro' : 'Novo Livro'}
        </DialogTitle>
        <DialogContent>
          <Box sx={{ mt: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField
              fullWidth
              label="Título"
              value={formData.titulo || ''}
              onChange={(e) => setFormData({ ...formData, titulo: e.target.value })}
              disabled={dialogMode === 'view'}
              required
            />
            <TextField
              fullWidth
              label="Subtítulo"
              value={formData.subtitulo || ''}
              onChange={(e) => setFormData({ ...formData, subtitulo: e.target.value })}
              disabled={dialogMode === 'view'}
            />
            <Grid container spacing={2}>
              <Grid item xs={12} md={4}>
                <TextField
                  fullWidth
                  label="Ano"
                  type="number"
                  value={formData.ano || ''}
                  onChange={(e) => setFormData({ ...formData, ano: e.target.value ? parseInt(e.target.value) : undefined })}
                  disabled={dialogMode === 'view'}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField
                  fullWidth
                  label="Edição"
                  type="number"
                  value={formData.edicao || ''}
                  onChange={(e) => setFormData({ ...formData, edicao: e.target.value ? parseInt(e.target.value) : undefined })}
                  disabled={dialogMode === 'view'}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField
                  fullWidth
                  label="Número de Páginas"
                  type="number"
                  value={formData.num_paginas || ''}
                  onChange={(e) => setFormData({ ...formData, num_paginas: e.target.value ? parseInt(e.target.value) : undefined })}
                  disabled={dialogMode === 'view'}
                />
              </Grid>
            </Grid>
            <FormControl fullWidth>
              <InputLabel>Autor</InputLabel>
              <Select
                value={formData.autor_id || ''}
                label="Autor"
                onChange={(e) => setFormData({ ...formData, autor_id: e.target.value as number })}
                disabled={dialogMode === 'view'}
              >
                <MenuItem value="">Selecione um autor</MenuItem>
                {autores.map((autor) => (
                  <MenuItem key={autor.id} value={autor.id}>
                    {autor.nome}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl fullWidth>
              <InputLabel>Editora</InputLabel>
              <Select
                value={formData.editora_id || ''}
                label="Editora"
                onChange={(e) => setFormData({ ...formData, editora_id: e.target.value as number })}
                disabled={dialogMode === 'view'}
              >
                <MenuItem value="">Selecione uma editora</MenuItem>
                {editoras.map((editora) => (
                  <MenuItem key={editora.id} value={editora.id}>
                    {editora.nome}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl fullWidth>
              <InputLabel>Idioma</InputLabel>
              <Select
                value={formData.idioma_id || ''}
                label="Idioma"
                onChange={(e) => setFormData({ ...formData, idioma_id: e.target.value as number })}
                disabled={dialogMode === 'view'}
              >
                <MenuItem value="">Selecione um idioma</MenuItem>
                {idiomas.map((idioma) => (
                  <MenuItem key={idioma.id} value={idioma.id}>
                    {idioma.codigo} - {idioma.descricao}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>
            {dialogMode === 'view' ? 'Fechar' : 'Cancelar'}
          </Button>
          {dialogMode !== 'view' && (
            <Button onClick={handleSave} variant="contained">
              Salvar
            </Button>
          )}
        </DialogActions>
      </Dialog>

      {/* Snackbar */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      >
        <Alert severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default LivrosPage;
