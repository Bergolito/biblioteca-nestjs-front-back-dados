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
} from '@mui/material';
import { DataGrid, GridColDef, GridActionsCellItem } from '@mui/x-data-grid';
import { Edit, Delete, Visibility } from '@mui/icons-material';
import { autorService } from '../services/autor-service';
import { Autor, AutorFilters } from '../types/autor';

const AutoresPage: React.FC = () => {
  const [autores, setAutores] = useState<Autor[]>([]);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState<AutorFilters>({});
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogMode, setDialogMode] = useState<'view' | 'edit' | 'create'>('view');
  const [selectedAutor, setSelectedAutor] = useState<Autor | null>(null);
  const [formData, setFormData] = useState<Partial<Autor>>({});
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' as 'success' | 'error' });

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 90 },
    { field: 'nome', headerName: 'Nome', flex: 1, minWidth: 200 },
    { field: 'nacionalidade', headerName: 'Nacionalidade', flex: 1, minWidth: 150 },
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
    loadAutores();
  }, []);

  const loadAutores = async (searchFilters?: AutorFilters) => {
    setLoading(true);
    try {
      const data = await autorService.getAll(searchFilters);
      // Valida se os dados retornados são um array e têm IDs válidos
      if (Array.isArray(data)) {
        const validData = data.filter(item => item && typeof item.id !== 'undefined');
        setAutores(validData);
      } else {
        console.error('Dados inválidos recebidos da API:', data);
        setAutores([]);
        showSnackbar('Formato de dados inválido recebido da API', 'error');
      }
    } catch (error) {
      console.error('Erro ao carregar autores:', error);
      setAutores([]);
      showSnackbar('Erro ao carregar autores', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    loadAutores(filters);
  };

  const handleClear = () => {
    setFilters({});
    loadAutores();
  };

  const handleView = (autor: Autor) => {
    setSelectedAutor(autor);
    setFormData(autor);
    setDialogMode('view');
    setOpenDialog(true);
  };

  const handleEdit = (autor: Autor) => {
    setSelectedAutor(autor);
    setFormData(autor);
    setDialogMode('edit');
    setOpenDialog(true);
  };

  const handleCreate = () => {
    setSelectedAutor(null);
    setFormData({});
    setDialogMode('create');
    setOpenDialog(true);
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('Tem certeza que deseja excluir este autor?')) {
      try {
        await autorService.delete(id);
        showSnackbar('Autor excluído com sucesso', 'success');
        loadAutores(filters);
      } catch (error) {
        showSnackbar('Erro ao excluir autor', 'error');
      }
    }
  };

  const handleSave = async () => {
    try {
      if (dialogMode === 'create') {
        await autorService.create(formData as Omit<Autor, 'id'>);
        showSnackbar('Autor criado com sucesso', 'success');
      } else if (dialogMode === 'edit' && selectedAutor) {
        await autorService.update(selectedAutor.id, formData);
        showSnackbar('Autor atualizado com sucesso', 'success');
      }
      setOpenDialog(false);
      loadAutores(filters);
    } catch (error) {
      showSnackbar('Erro ao salvar autor', 'error');
    }
  };

  const showSnackbar = (message: string, severity: 'success' | 'error') => {
    setSnackbar({ open: true, message, severity });
  };

  return (
    <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" gutterBottom>
        Autores
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
              label="Nome"
              value={filters.nome || ''}
              onChange={(e) => setFilters({ ...filters, nome: e.target.value })}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Nacionalidade"
              value={filters.nacionalidade || ''}
              onChange={(e) => setFilters({ ...filters, nacionalidade: e.target.value })}
            />
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
                Novo Autor
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Paper>

      {/* Grid */}
      <Paper sx={{ p: 2, height: 500 }}>
        <DataGrid
          rows={autores}
          columns={columns}
          loading={loading}
          pageSizeOptions={[5, 10, 25, 50]}
          initialState={{
            pagination: { paginationModel: { pageSize: 25 } },
          }}
        />
      </Paper>

      {/* Dialog */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>
          {dialogMode === 'view' ? 'Detalhes do Autor' : dialogMode === 'edit' ? 'Editar Autor' : 'Novo Autor'}
        </DialogTitle>
        <DialogContent>
          <Box sx={{ mt: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField
              fullWidth
              label="Nome"
              value={formData.nome || ''}
              onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
              disabled={dialogMode === 'view'}
              required
            />
            <TextField
              fullWidth
              label="Nacionalidade"
              value={formData.nacionalidade || ''}
              onChange={(e) => setFormData({ ...formData, nacionalidade: e.target.value })}
              disabled={dialogMode === 'view'}
            />
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

export default AutoresPage;
