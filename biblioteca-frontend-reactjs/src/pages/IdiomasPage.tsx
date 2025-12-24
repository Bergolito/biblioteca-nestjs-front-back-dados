import React from 'react';
import { Container, Typography, Paper } from '@mui/material';

const IdiomasPage: React.FC = () => {
  return (
    <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" gutterBottom>
        Idiomas
      </Typography>
      <Paper sx={{ p: 3 }}>
        <Typography>
          Página de gerenciamento de idiomas em desenvolvimento.
        </Typography>
      </Paper>
    </Container>
  );
};

export default IdiomasPage;
