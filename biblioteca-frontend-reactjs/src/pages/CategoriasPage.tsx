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
import { categoriaService } from '../services/categoriaService';
import { Categoria, CategoriaFilters } from '../types/categoria';

const CategoriasPage: React.FC = () => {
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState<CategoriaFilters>({});
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogMode, setDialogMode] = useState<'view' | 'edit' | 'create'>('view');
  const [selectedCategoria, setSelectedCategoria] = useState<Categoria | null>(null);
  const [formData, setFormData] = useState<Partial<Categoria>>({});
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' as 'success' | 'error' });

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 90 },
    { field: 'nome', headerName: 'Nome', flex: 1, minWidth: 200 },
    { field: 'descricao', headerName: 'Descrição', flex: 2, minWidth: 300 },
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
    loadCategorias();
  }, []);

  const loadCategorias = async (searchFilters?: CategoriaFilters) => {
    setLoading(true);
    try {
      const data = await categoriaService.getAll(searchFilters);
      if (Array.isArray(data)) {
        const validData = data.filter(item => item && typeof item.id !== 'undefined');
        setCategorias(validData);
      } else {
        console.error('Dados inválidos recebidos da API:', data);
        setCategorias([]);
        showSnackbar('Formato de dados inválido recebido da API', 'error');
      }
    } catch (error) {
      console.error('Erro ao carregar categorias:', error);
      setCategorias([]);
      showSnackbar('Erro ao carregar categorias', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    loadCategorias(filters);
  };

  const handleClear = () => {
    setFilters({});
    loadCategorias();
  };

  const handleView = (categoria: Categoria) => {
    setSelectedCategoria(categoria);
    setFormData(categoria);
    setDialogMode('view');
    setOpenDialog(true);
  };

  const handleEdit = (categoria: Categoria) => {
    setSelectedCategoria(categoria);
    setFormData(categoria);
    setDialogMode('edit');
    setOpenDialog(true);
  };

  const handleCreate = () => {
    setSelectedCategoria(null);
    setFormData({});
    setDialogMode('create');
    setOpenDialog(true);
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('Tem certeza que deseja excluir esta categoria?')) {
      try {
        await categoriaService.delete(id);
        showSnackbar('Categoria excluída com sucesso', 'success');
        loadCategorias(filters);
      } catch (error) {
        showSnackbar('Erro ao excluir categoria', 'error');
      }
    }
  };

  const handleSave = async () => {
    try {
      if (dialogMode === 'create') {
        await categoriaService.create(formData as Omit<Categoria, 'id'>);
        showSnackbar('Categoria criada com sucesso', 'success');
      } else if (dialogMode === 'edit' && selectedCategoria) {
        await categoriaService.update(selectedCategoria.id, formData);
        showSnackbar('Categoria atualizada com sucesso', 'success');
      }
      setOpenDialog(false);
      loadCategorias(filters);
    } catch (error) {
      showSnackbar('Erro ao salvar categoria', 'error');
    }
  };

  const showSnackbar = (message: string, severity: 'success' | 'error') => {
    setSnackbar({ open: true, message, severity });
  };

  return (
    <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" gutterBottom>
        Categorias
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
              label="Descrição"
              value={filters.descricao || ''}
              onChange={(e) => setFilters({ ...filters, descricao: e.target.value })}
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
                Nova Categoria
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Paper>

      {/* Grid */}
      <Paper sx={{ p: 2, height: 500 }}>
        <DataGrid
          rows={categorias}
          columns={columns}
          loading={loading}
          pageSizeOptions={[5, 10, 25, 50]}
          initialState={{
            pagination: { paginationModel: { pageSize: 10 } },
          }}
        />
      </Paper>

      {/* Dialog */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>
          {dialogMode === 'view' ? 'Detalhes da Categoria' : dialogMode === 'edit' ? 'Editar Categoria' : 'Nova Categoria'}
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
              label="Descrição"
              multiline
              rows={4}
              value={formData.descricao || ''}
              onChange={(e) => setFormData({ ...formData, descricao: e.target.value })}
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

export default CategoriasPage;
