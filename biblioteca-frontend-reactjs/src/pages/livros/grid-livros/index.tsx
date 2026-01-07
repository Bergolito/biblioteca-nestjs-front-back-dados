import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Card,
  CardContent,
  CardMedia,
  CardActions,
  Typography,
  Button,
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Chip,
  Divider,
  Paper,
} from '@mui/material';
import { AutoStories, Visibility } from '@mui/icons-material';
import { livroService } from '../../../services/livro-service';
import { Livro } from '../../../types/livro';
import Loading from '../../../components/Loading';
import ErrorMessage from '../../../components/ErrorMessage';

const GridLivros: React.FC = () => {
  const [livros, setLivros] = useState<Livro[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedLivro, setSelectedLivro] = useState<Livro | null>(null);
  const [openDialog, setOpenDialog] = useState(false);

  useEffect(() => {
    loadLivros();
  }, []);

  const loadLivros = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await livroService.getAll();
      if (Array.isArray(data)) {
        const validData = data.filter(item => item && typeof item.id !== 'undefined');
        setLivros(validData);
      } else {
        console.error('Dados inválidos recebidos da API:', data);
        setLivros([]);
        setError('Formato de dados inválido recebido da API');
      }
    } catch (error) {
      console.error('Erro ao carregar livros:', error);
      setLivros([]);
      setError('Erro ao carregar livros');
    } finally {
      setLoading(false);
    }
  };

  const handleViewDetails = (livro: Livro) => {
    setSelectedLivro(livro);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedLivro(null);
  };

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <ErrorMessage message={error} onRetry={loadLivros} />;
  }

  return (
    <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
        <AutoStories sx={{ fontSize: 40, mr: 2, color: 'primary.main' }} />
        <Typography variant="h4" component="h1">
          Biblioteca de Livros
        </Typography>
      </Box>

      <Typography variant="subtitle1" color="text.secondary" sx={{ mb: 3 }}>
        {livros.length} {livros.length === 1 ? 'livro encontrado' : 'livros encontrados'}
      </Typography>

      <Grid container spacing={3}>
        {livros.map((livro) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={livro.id}>
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
              <CardMedia
                component="div"
                sx={{
                  height: 200,
                  bgcolor: 'grey.200',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundImage: livro.imagem_id 
                    ? `url(${import.meta.env.VITE_API_URL || 'http://localhost:3000'}/imagens/${livro.imagem_id})`
                    : 'none',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              >
                {!livro.imagem_id && (
                  <AutoStories sx={{ fontSize: 80, color: 'grey.400' }} />
                )}
              </CardMedia>
              
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography 
                  gutterBottom 
                  variant="h6" 
                  component="h2"
                  sx={{
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    minHeight: '3.6em',
                  }}
                >
                  {livro.titulo}
                </Typography>
                
                {livro.subtitulo && (
                  <Typography 
                    variant="body2" 
                    color="text.secondary"
                    sx={{
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      display: '-webkit-box',
                      WebkitLineClamp: 1,
                      WebkitBoxOrient: 'vertical',
                      mb: 1,
                    }}
                  >
                    {livro.subtitulo}
                  </Typography>
                )}
                
                <Typography variant="body2" color="primary" sx={{ fontWeight: 500, mt: 1 }}>
                  {livro.autor?.nome || 'Autor não informado'}
                </Typography>
                
                {livro.ano && (
                  <Chip 
                    label={livro.ano} 
                    size="small" 
                    sx={{ mt: 1 }}
                  />
                )}
              </CardContent>
              
              <CardActions sx={{ justifyContent: 'center', pb: 2 }}>
                <Button
                  variant="contained"
                  startIcon={<Visibility />}
                  onClick={() => handleViewDetails(livro)}
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

      {livros.length === 0 && !loading && !error && (
        <Paper sx={{ p: 4, textAlign: 'center' }}>
          <AutoStories sx={{ fontSize: 60, color: 'grey.400', mb: 2 }} />
          <Typography variant="h6" color="text.secondary">
            Nenhum livro cadastrado
          </Typography>
        </Paper>
      )}

      {/* Dialog de Detalhes */}
      <Dialog 
        open={openDialog} 
        onClose={handleCloseDialog} 
        maxWidth="md" 
        fullWidth
      >
        <DialogTitle>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <AutoStories sx={{ mr: 1, color: 'primary.main' }} />
            Detalhes do Livro
          </Box>
        </DialogTitle>
        
        <DialogContent dividers>
          {selectedLivro && (
            <Grid container spacing={3}>
              <Grid item xs={12} md={4}>
                <Box
                  sx={{
                    height: 300,
                    bgcolor: 'grey.200',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: 1,
                    backgroundImage: selectedLivro.imagem_id 
                      ? `url(${import.meta.env.VITE_API_URL || 'http://localhost:3000'}/imagens/${selectedLivro.imagem_id})`
                      : 'none',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                  }}
                >
                  {!selectedLivro.imagem_id && (
                    <AutoStories sx={{ fontSize: 100, color: 'grey.400' }} />
                  )}
                </Box>
              </Grid>
              
              <Grid item xs={12} md={8}>
                <Typography variant="h5" gutterBottom sx={{ fontWeight: 600 }}>
                  {selectedLivro.titulo}
                </Typography>
                
                {selectedLivro.subtitulo && (
                  <Typography variant="subtitle1" color="text.secondary" gutterBottom>
                    {selectedLivro.subtitulo}
                  </Typography>
                )}
                
                <Divider sx={{ my: 2 }} />
                
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Typography variant="body2" color="text.secondary">
                      Autor
                    </Typography>
                    <Typography variant="body1" sx={{ fontWeight: 500 }}>
                      {selectedLivro.autor?.nome || 'Não informado'}
                    </Typography>
                  </Grid>
                  
                  <Grid item xs={12}>
                    <Typography variant="body2" color="text.secondary">
                      Editora
                    </Typography>
                    <Typography variant="body1" sx={{ fontWeight: 500 }}>
                      {selectedLivro.editora?.nome || 'Não informada'}
                    </Typography>
                  </Grid>
                  
                  {selectedLivro.idioma && (
                    <Grid item xs={12}>
                      <Typography variant="body2" color="text.secondary">
                        Idioma
                      </Typography>
                      <Typography variant="body1" sx={{ fontWeight: 500 }}>
                        {selectedLivro.idioma.codigo}
                        {selectedLivro.idioma.descricao && ` - ${selectedLivro.idioma.descricao}`}
                      </Typography>
                    </Grid>
                  )}
                  
                  <Grid item xs={6}>
                    <Typography variant="body2" color="text.secondary">
                      Ano
                    </Typography>
                    <Typography variant="body1" sx={{ fontWeight: 500 }}>
                      {selectedLivro.ano || 'Não informado'}
                    </Typography>
                  </Grid>
                  
                  <Grid item xs={6}>
                    <Typography variant="body2" color="text.secondary">
                      Edição
                    </Typography>
                    <Typography variant="body1" sx={{ fontWeight: 500 }}>
                      {selectedLivro.edicao ? `${selectedLivro.edicao}ª` : 'Não informada'}
                    </Typography>
                  </Grid>
                  
                  <Grid item xs={12}>
                    <Typography variant="body2" color="text.secondary">
                      Páginas
                    </Typography>
                    <Typography variant="body1" sx={{ fontWeight: 500 }}>
                      {selectedLivro.num_paginas || 'Não informado'}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
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

export default GridLivros;
