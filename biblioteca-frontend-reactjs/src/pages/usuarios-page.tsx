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
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import { DataGrid, GridColDef, GridActionsCellItem } from '@mui/x-data-grid';
import { Edit, Delete, Visibility } from '@mui/icons-material';
import { usuarioService } from '../services/usuario-service';
import { Usuario, UsuarioFilters } from '../types/usuario';

const UsuariosPage: React.FC = () => {
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState<UsuarioFilters>({});
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogMode, setDialogMode] = useState<'view' | 'edit' | 'create'>('view');
  const [selectedUsuario, setSelectedUsuario] = useState<Usuario | null>(null);
  const [formData, setFormData] = useState<Partial<Usuario>>({});
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' as 'success' | 'error' });

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'nome', headerName: 'Nome', flex: 1, minWidth: 200 },
    { field: 'email', headerName: 'Email', flex: 1, minWidth: 200 },
    { field: 'telefone', headerName: 'Telefone', width: 150 },
    { field: 'sexo', headerName: 'Sexo', width: 80 },
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
    loadUsuarios();
  }, []);

  const loadUsuarios = async (searchFilters?: UsuarioFilters) => {
    setLoading(true);
    try {
      const data = await usuarioService.getAll(searchFilters);
      if (Array.isArray(data)) {
        const validData = data.filter(item => item && typeof item.id !== 'undefined');
        setUsuarios(validData);
      } else {
        console.error('Dados inválidos recebidos da API:', data);
        setUsuarios([]);
        showSnackbar('Formato de dados inválido recebido da API', 'error');
      }
    } catch (error) {
      console.error('Erro ao carregar usuários:', error);
      setUsuarios([]);
      showSnackbar('Erro ao carregar usuários', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    loadUsuarios(filters);
  };

  const handleClear = () => {
    setFilters({});
    loadUsuarios();
  };

  const handleView = (usuario: Usuario) => {
    setSelectedUsuario(usuario);
    setFormData(usuario);
    setDialogMode('view');
    setOpenDialog(true);
  };

  const handleEdit = (usuario: Usuario) => {
    setSelectedUsuario(usuario);
    // Remove senha do formData ao editar
    const { senha, ...usuarioSemSenha } = usuario;
    setFormData(usuarioSemSenha);
    setDialogMode('edit');
    setOpenDialog(true);
  };

  const handleCreate = () => {
    setSelectedUsuario(null);
    setFormData({});
    setDialogMode('create');
    setOpenDialog(true);
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('Tem certeza que deseja excluir este usuário?')) {
      try {
        await usuarioService.delete(id);
        showSnackbar('Usuário excluído com sucesso', 'success');
        loadUsuarios(filters);
      } catch (error) {
        showSnackbar('Erro ao excluir usuário', 'error');
      }
    }
  };

  const handleSave = async () => {
    try {
      if (dialogMode === 'create') {
        await usuarioService.create(formData as Omit<Usuario, 'id'>);
        showSnackbar('Usuário criado com sucesso', 'success');
      } else if (dialogMode === 'edit' && selectedUsuario) {
        // Remove senha se estiver vazia ao editar
        const dataToUpdate = { ...formData };
        if (!dataToUpdate.senha) {
          delete dataToUpdate.senha;
        }
        await usuarioService.update(selectedUsuario.id, dataToUpdate);
        showSnackbar('Usuário atualizado com sucesso', 'success');
      }
      setOpenDialog(false);
      loadUsuarios(filters);
    } catch (error) {
      showSnackbar('Erro ao salvar usuário', 'error');
    }
  };

  const showSnackbar = (message: string, severity: 'success' | 'error') => {
    setSnackbar({ open: true, message, severity });
  };

  return (
    <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" gutterBottom>
        Usuários
      </Typography>

      {/* Filtros */}
      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          Filtros de Pesquisa
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              label="Nome"
              value={filters.nome || ''}
              onChange={(e) => setFilters({ ...filters, nome: e.target.value })}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              label="Email"
              value={filters.email || ''}
              onChange={(e) => setFilters({ ...filters, email: e.target.value })}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              label="Telefone"
              value={filters.telefone || ''}
              onChange={(e) => setFilters({ ...filters, telefone: e.target.value })}
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
                Novo Usuário
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Paper>

      {/* Grid */}
      <Paper sx={{ p: 2, height: 500 }}>
        <DataGrid
          rows={usuarios}
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
          {dialogMode === 'view' ? 'Detalhes do Usuário' : dialogMode === 'edit' ? 'Editar Usuário' : 'Novo Usuário'}
        </DialogTitle>
        <DialogContent>
          <Box sx={{ mt: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Nome"
                  value={formData.nome || ''}
                  onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                  disabled={dialogMode === 'view'}
                  required
                  inputProps={{ maxLength: 200 }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Email"
                  type="email"
                  value={formData.email || ''}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  disabled={dialogMode === 'view'}
                  required
                  inputProps={{ maxLength: 200 }}
                />
              </Grid>
              {dialogMode !== 'view' && (
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label={dialogMode === 'edit' ? 'Nova Senha (deixe vazio para manter)' : 'Senha'}
                    type="password"
                    value={formData.senha || ''}
                    onChange={(e) => setFormData({ ...formData, senha: e.target.value })}
                    required={dialogMode === 'create'}
                    inputProps={{ maxLength: 60 }}
                  />
                </Grid>
              )}
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Telefone"
                  value={formData.telefone || ''}
                  onChange={(e) => setFormData({ ...formData, telefone: e.target.value })}
                  disabled={dialogMode === 'view'}
                  inputProps={{ maxLength: 20 }}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Data de Nascimento"
                  type="date"
                  value={formData.data_nasc ? new Date(formData.data_nasc).toISOString().split('T')[0] : ''}
                  onChange={(e) => setFormData({ ...formData, data_nasc: e.target.value })}
                  disabled={dialogMode === 'view'}
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <FormControl fullWidth>
                  <InputLabel>Sexo</InputLabel>
                  <Select
                    value={formData.sexo || ''}
                    label="Sexo"
                    onChange={(e) => setFormData({ ...formData, sexo: e.target.value })}
                    disabled={dialogMode === 'view'}
                  >
                    <MenuItem value="">Selecione</MenuItem>
                    <MenuItem value="M">Masculino</MenuItem>
                    <MenuItem value="F">Feminino</MenuItem>
                    <MenuItem value="O">Outro</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Endereço"
                  multiline
                  rows={3}
                  value={formData.endereco || ''}
                  onChange={(e) => setFormData({ ...formData, endereco: e.target.value })}
                  disabled={dialogMode === 'view'}
                />
              </Grid>
            </Grid>
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

export default UsuariosPage;
