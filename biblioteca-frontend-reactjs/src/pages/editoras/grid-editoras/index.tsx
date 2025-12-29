import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Divider,
  Paper,
  Avatar,
} from '@mui/material';
import { Business, Visibility } from '@mui/icons-material';
import { editoraService } from '../../../services/editora-service';
import { Editora } from '../../../types/editora';
import Loading from '../../../components/Loading';
import ErrorMessage from '../../../components/ErrorMessage';

const GridEditoras: React.FC = () => {
  const [editoras, setEditoras] = useState<Editora[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedEditora, setSelectedEditora] = useState<Editora | null>(null);
  const [openDialog, setOpenDialog] = useState(false);

  useEffect(() => {
    loadEditoras();
  }, []);

  const loadEditoras = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await editoraService.getAll();
      if (Array.isArray(data)) {
        const validData = data.filter(item => item && typeof item.id !== 'undefined');
        setEditoras(validData);
      } else {
        console.error('Dados inválidos recebidos da API:', data);
        setEditoras([]);
        setError('Formato de dados inválido recebido da API');
      }
    } catch (error) {
      console.error('Erro ao carregar editoras:', error);
      setEditoras([]);
      setError('Erro ao carregar editoras');
    } finally {
      setLoading(false);
    }
  };

  const handleViewDetails = (editora: Editora) => {
    setSelectedEditora(editora);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedEditora(null);
  };

  const getInitials = (nome: string) => {
    const words = nome.split(' ');
    if (words.length >= 2) {
      return `${words[0][0]}${words[1][0]}`.toUpperCase();
    }
    return nome.substring(0, 2).toUpperCase();
  };

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <ErrorMessage message={error} onRetry={loadEditoras} />;
  }

  return (
    <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
        <Business sx={{ fontSize: 40, mr: 2, color: 'primary.main' }} />
        <Typography variant="h4" component="h1">
          Editoras
        </Typography>
      </Box>

      <Typography variant="subtitle1" color="text.secondary" sx={{ mb: 3 }}>
        {editoras.length} {editoras.length === 1 ? 'editora encontrada' : 'editoras encontradas'}
      </Typography>

      <Grid container spacing={3}>
        {editoras.map((editora) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={editora.id}>
            <Card 
              sx={{ 
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                transition: 'transform 0.2s, box-shadow 0.2s',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: 6,
                },
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  pt: 3,
                  pb: 2,
                  bgcolor: 'grey.100',
                }}
              >
                <Avatar
                  sx={{
                    width: 100,
                    height: 100,
                    bgcolor: 'secondary.main',
                    fontSize: '2rem',
                    fontWeight: 600,
                  }}
                >
                  {getInitials(editora.nome)}
                </Avatar>
              </Box>
              
              <CardContent sx={{ flexGrow: 1, textAlign: 'center' }}>
                <Typography 
                  variant="h6" 
                  component="h2"
                  sx={{
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    minHeight: '3em',
                    fontWeight: 600,
                  }}
                >
                  {editora.nome}
                </Typography>
              </CardContent>
              
              <CardActions sx={{ justifyContent: 'center', pb: 2 }}>
                <Button
                  variant="contained"
                  startIcon={<Visibility />}
                  onClick={() => handleViewDetails(editora)}
                  fullWidth
                  sx={{ mx: 2 }}
                >
                  Detalhar
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

      {editoras.length === 0 && !loading && !error && (
        <Paper sx={{ p: 4, textAlign: 'center' }}>
          <Business sx={{ fontSize: 60, color: 'grey.400', mb: 2 }} />
          <Typography variant="h6" color="text.secondary">
            Nenhuma editora cadastrada
          </Typography>
        </Paper>
      )}

      {/* Dialog de Detalhes */}
      <Dialog 
        open={openDialog} 
        onClose={handleCloseDialog} 
        maxWidth="sm" 
        fullWidth
      >
        <DialogTitle>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Business sx={{ mr: 1, color: 'primary.main' }} />
            Detalhes da Editora
          </Box>
        </DialogTitle>
        
        <DialogContent dividers>
          {selectedEditora && (
            <Box>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  mb: 3,
                }}
              >
                <Avatar
                  sx={{
                    width: 120,
                    height: 120,
                    bgcolor: 'secondary.main',
                    fontSize: '2.5rem',
                    fontWeight: 600,
                    mb: 2,
                  }}
                >
                  {getInitials(selectedEditora.nome)}
                </Avatar>
                
                <Typography variant="h5" gutterBottom sx={{ fontWeight: 600, textAlign: 'center' }}>
                  {selectedEditora.nome}
                </Typography>
              </Box>
              
              <Divider sx={{ my: 2 }} />
              
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Typography variant="body2" color="text.secondary">
                    ID
                  </Typography>
                  <Typography variant="body1" sx={{ fontWeight: 500 }}>
                    {selectedEditora.id}
                  </Typography>
                </Grid>
                
                <Grid item xs={12}>
                  <Typography variant="body2" color="text.secondary">
                    Nome da Editora
                  </Typography>
                  <Typography variant="body1" sx={{ fontWeight: 500 }}>
                    {selectedEditora.nome}
                  </Typography>
                </Grid>
              </Grid>
            </Box>
          )}
        </DialogContent>
        
        <DialogActions>
          <Button onClick={handleCloseDialog} variant="contained">
            Fechar
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default GridEditoras;
