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
import { idiomaService } from '../services/idiomaService';
import { Idioma, IdiomaFilters } from '../types/idioma';

const IdiomasPage: React.FC = () => {
  const [idiomas, setIdiomas] = useState<Idioma[]>([]);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState<IdiomaFilters>({});
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogMode, setDialogMode] = useState<'view' | 'edit' | 'create'>('view');
  const [selectedIdioma, setSelectedIdioma] = useState<Idioma | null>(null);
  const [formData, setFormData] = useState<Partial<Idioma>>({});
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' as 'success' | 'error' });

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 90 },
    { field: 'codigo', headerName: 'Código', flex: 1, minWidth: 150 },
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
    loadIdiomas();
  }, []);

  const loadIdiomas = async (searchFilters?: IdiomaFilters) => {
    setLoading(true);
    try {
      const data = await idiomaService.getAll(searchFilters);
      if (Array.isArray(data)) {
        const validData = data.filter(item => item && typeof item.id !== 'undefined');
        setIdiomas(validData);
      } else {
        console.error('Dados inválidos recebidos da API:', data);
        setIdiomas([]);
        showSnackbar('Formato de dados inválido recebido da API', 'error');
      }
    } catch (error) {
      console.error('Erro ao carregar idiomas:', error);
      setIdiomas([]);
      showSnackbar('Erro ao carregar idiomas', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    loadIdiomas(filters);
  };

  const handleClear = () => {
    setFilters({});
    loadIdiomas();
  };

  const handleView = (idioma: Idioma) => {
    setSelectedIdioma(idioma);
    setFormData(idioma);
    setDialogMode('view');
    setOpenDialog(true);
  };

  const handleEdit = (idioma: Idioma) => {
    setSelectedIdioma(idioma);
    setFormData(idioma);
    setDialogMode('edit');
    setOpenDialog(true);
  };

  const handleCreate = () => {
    setSelectedIdioma(null);
    setFormData({});
    setDialogMode('create');
    setOpenDialog(true);
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('Tem certeza que deseja excluir este idioma?')) {
      try {
        await idiomaService.delete(id);
        showSnackbar('Idioma excluído com sucesso', 'success');
        loadIdiomas(filters);
      } catch (error) {
        showSnackbar('Erro ao excluir idioma', 'error');
      }
    }
  };

  const handleSave = async () => {
    try {
      if (dialogMode === 'create') {
        await idiomaService.create(formData as Omit<Idioma, 'id'>);
        showSnackbar('Idioma criado com sucesso', 'success');
      } else if (dialogMode === 'edit' && selectedIdioma) {
        await idiomaService.update(selectedIdioma.id, formData);
        showSnackbar('Idioma atualizado com sucesso', 'success');
      }
      setOpenDialog(false);
      loadIdiomas(filters);
    } catch (error) {
      showSnackbar('Erro ao salvar idioma', 'error');
    }
  };

  const showSnackbar = (message: string, severity: 'success' | 'error') => {
    setSnackbar({ open: true, message, severity });
  };

  return (
    <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" gutterBottom>
        Idiomas
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
              label="Código"
              value={filters.codigo || ''}
              onChange={(e) => setFilters({ ...filters, codigo: e.target.value })}
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
                Novo Idioma
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Paper>

      {/* Grid */}
      <Paper sx={{ p: 2, height: 500 }}>
        <DataGrid
          rows={idiomas}
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
          {dialogMode === 'view' ? 'Detalhes do Idioma' : dialogMode === 'edit' ? 'Editar Idioma' : 'Novo Idioma'}
        </DialogTitle>
        <DialogContent>
          <Box sx={{ mt: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField
              fullWidth
              label="Código"
              value={formData.codigo || ''}
              onChange={(e) => setFormData({ ...formData, codigo: e.target.value })}
              disabled={dialogMode === 'view'}
              required
              inputProps={{ maxLength: 20 }}
              helperText="Ex: pt-BR, en-US, es-ES"
            />
            <TextField
              fullWidth
              label="Descrição"
              value={formData.descricao || ''}
              onChange={(e) => setFormData({ ...formData, descricao: e.target.value })}
              disabled={dialogMode === 'view'}
              inputProps={{ maxLength: 100 }}
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

export default IdiomasPage;
