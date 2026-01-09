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
  Pagination,
} from '@mui/material';
import { AutoStories, Visibility } from '@mui/icons-material';
import { livroService } from '../../../services/livro-service';
import { Livro } from '../../../types/livro';
import Loading from '../../../components/Loading';
import ErrorMessage from '../../../components/ErrorMessage';

const ITEMS_PER_PAGE = 12;

const GridLivros: React.FC = () => {
  const [livros, setLivros] = useState<Livro[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedLivro, setSelectedLivro] = useState<Livro | null>(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [page, setPage] = useState(1);

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

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Calcular itens da página atual
  const totalPages = Math.ceil(livros.length / ITEMS_PER_PAGE);
  const startIndex = (page - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const livrosPaginados = livros.slice(startIndex, endIndex);

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
        {totalPages > 1 && ` • Página ${page} de ${totalPages}`}
      </Typography>

      <Grid container spacing={3}>
        {livrosPaginados.map((livro) => (
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
              <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', p: 2 }}>
                <CardMedia
                  component="div"
                  sx={{
                    width: '100%',
                    height: 280,
                    bgcolor: 'grey.200',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundImage: `url(/assets/imagens-livros/${livro.id}.jpg)`,
                    backgroundSize: 'contain',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center',
                    borderRadius: 1,
                  }}
                >
                  {!livro.imagem_id && (
                    <AutoStories sx={{ fontSize: 80, color: 'grey.400' }} />
                  )}
                </CardMedia>
              </Box>
              
              <Divider />
              
              <CardContent sx={{ pt: 2, pb: 1 }}>
                <Typography 
                  gutterBottom 
                  variant="subtitle1" 
                  component="h2"
                  sx={{
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    minHeight: '2.8em',
                    fontWeight: 600,
                    fontSize: '0.95rem',
                  }}
                >
                  {livro.titulo}
                </Typography>
                
                <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                  {livro.autor?.nome || 'Autor não informado'}
                </Typography>
                
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  {livro.ano && (
                    <Chip 
                      label={livro.ano} 
                      size="small" 
                      sx={{ fontSize: '0.75rem' }}
                    />
                  )}
                </Box>
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

      {/* Paginação */}
      {totalPages > 1 && (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <Pagination
            count={totalPages}
            page={page}
            onChange={handlePageChange}
            color="primary"
            size="large"
            showFirstButton
            showLastButton
          />
        </Box>
      )}

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
                    backgroundImage: `url(/assets/imagens-livros/${selectedLivro.id}.jpg)`,                    
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
