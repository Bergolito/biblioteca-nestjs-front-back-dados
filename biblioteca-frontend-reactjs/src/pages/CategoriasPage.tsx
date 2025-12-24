import React from 'react';
import { Container, Typography, Paper } from '@mui/material';

const CategoriasPage: React.FC = () => {
  return (
    <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" gutterBottom>
        Categorias
      </Typography>
      <Paper sx={{ p: 3 }}>
        <Typography>
          Página de gerenciamento de categorias em desenvolvimento.
        </Typography>
      </Paper>
    </Container>
  );
};

export default CategoriasPage;
