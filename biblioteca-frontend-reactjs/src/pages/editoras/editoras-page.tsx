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
import { editoraService } from '../../services/editora-service';
import { Editora, EditoraFilters } from '../../types/editora';

const EditorasPage: React.FC = () => {
  const [editoras, setEditoras] = useState<Editora[]>([]);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState<EditoraFilters>({});
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogMode, setDialogMode] = useState<'view' | 'edit' | 'create'>('view');
  const [selectedEditora, setSelectedEditora] = useState<Editora | null>(null);
  const [formData, setFormData] = useState<Partial<Editora>>({});
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' as 'success' | 'error' });

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 90 },
    { field: 'nome', headerName: 'Nome', flex: 1, minWidth: 300 },
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
    loadEditoras();
  }, []);

  const loadEditoras = async (searchFilters?: EditoraFilters) => {
    setLoading(true);
    try {
      const data = await editoraService.getAll(searchFilters);
      // Valida se os dados retornados são um array e têm IDs válidos
      if (Array.isArray(data)) {
        const validData = data.filter(item => item && typeof item.id !== 'undefined');
        setEditoras(validData);
      } else {
        console.error('Dados inválidos recebidos da API:', data);
        setEditoras([]);
        showSnackbar('Formato de dados inválido recebido da API', 'error');
      }
    } catch (error) {
      console.error('Erro ao carregar editoras:', error);
      setEditoras([]);
      showSnackbar('Erro ao carregar editoras', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    loadEditoras(filters);
  };

  const handleClear = () => {
    setFilters({});
    loadEditoras();
  };

  const handleView = (editora: Editora) => {
    setSelectedEditora(editora);
    setFormData(editora);
    setDialogMode('view');
    setOpenDialog(true);
  };

  const handleEdit = (editora: Editora) => {
    setSelectedEditora(editora);
    setFormData(editora);
    setDialogMode('edit');
    setOpenDialog(true);
  };

  const handleCreate = () => {
    setSelectedEditora(null);
    setFormData({});
    setDialogMode('create');
    setOpenDialog(true);
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('Tem certeza que deseja excluir esta editora?')) {
      try {
        await editoraService.delete(id);
        showSnackbar('Editora excluída com sucesso', 'success');
        loadEditoras(filters);
      } catch (error) {
        showSnackbar('Erro ao excluir editora', 'error');
      }
    }
  };

  const handleSave = async () => {
    try {
      if (dialogMode === 'create') {
        await editoraService.create(formData as Omit<Editora, 'id'>);
        showSnackbar('Editora criada com sucesso', 'success');
      } else if (dialogMode === 'edit' && selectedEditora) {
        await editoraService.update(selectedEditora.id, formData);
        showSnackbar('Editora atualizada com sucesso', 'success');
      }
      setOpenDialog(false);
      loadEditoras(filters);
    } catch (error) {
      showSnackbar('Erro ao salvar editora', 'error');
    }
  };

  const showSnackbar = (message: string, severity: 'success' | 'error') => {
    setSnackbar({ open: true, message, severity });
  };

  return (
    <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" gutterBottom>
        Editoras
      </Typography>

      {/* Filtros */}
      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          Filtros de Pesquisa
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} md={8}>
            <TextField
              fullWidth
              label="Nome"
              value={filters.nome || ''}
              onChange={(e) => setFilters({ ...filters, nome: e.target.value })}
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
                Nova Editora
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Paper>

      {/* Grid */}
      <Paper sx={{ p: 2, height: 500 }}>
        <DataGrid
          rows={editoras}
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
          {dialogMode === 'view' ? 'Detalhes da Editora' : dialogMode === 'edit' ? 'Editar Editora' : 'Nova Editora'}
        </DialogTitle>
        <DialogContent>
          <Box sx={{ mt: 2 }}>
            <TextField
              fullWidth
              label="Nome"
              value={formData.nome || ''}
              onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
              disabled={dialogMode === 'view'}
              required
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
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      >
        <Alert severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default EditorasPage;
