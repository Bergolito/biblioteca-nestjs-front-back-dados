import React from 'react';
import { Container, Typography, Paper, Box } from '@mui/material';
import { Book } from '@mui/icons-material';

const HomePage: React.FC = () => {
  return (
    <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
      <Paper 
        sx={{ 
          p: 6, 
          textAlign: 'center',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: 'white'
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
          <Book sx={{ fontSize: 80 }} />
        </Box>
        <Typography variant="h2" gutterBottom>
          Biblioteca Pessoal
        </Typography>
        <Typography variant="h5" sx={{ mt: 2 }}>
          Sistema de Gerenciamento de Livros
        </Typography>
        <Typography variant="body1" sx={{ mt: 3, maxWidth: 600, mx: 'auto' }}>
          Organize sua coleção de livros, gerencie autores, editoras e muito mais.
          Use o menu acima para navegar pelas diferentes seções do sistema.
        </Typography>
      </Paper>
    </Container>
  );
};

export default HomePage;
