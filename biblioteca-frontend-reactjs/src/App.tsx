import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme, CssBaseline, Box } from '@mui/material';
import Navbar from './components/Navbar';
import HomePage from './pages/home-page';
import AutoresPage from './pages/autores-page';
import EditorasPage from './pages/editoras-page';
import LivrosPage from './pages/livros-page';
import CategoriasPage from './pages/categorias-page';
import IdiomasPage from './pages/idiomas-page';
import UsuariosPage from './pages/usuarios-page';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
  typography: {
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
    ].join(','),
  },
});

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
          <Navbar />
          <Box component="main" sx={{ flexGrow: 1, bgcolor: '#f5f5f5' }}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/autores" element={<AutoresPage />} />
              <Route path="/editoras" element={<EditorasPage />} />
              <Route path="/livros" element={<LivrosPage />} />
              <Route path="/categorias" element={<CategoriasPage />} />
              <Route path="/idiomas" element={<IdiomasPage />} />
              <Route path="/usuarios" element={<UsuariosPage />} />
            </Routes>
          </Box>
        </Box>
      </Router>
    </ThemeProvider>
  );
};

export default App;
