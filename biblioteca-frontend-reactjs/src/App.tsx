import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme, CssBaseline, Box } from '@mui/material';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';
import HomePage from './pages/home-page';
import LoginPage from './pages/login-page';
import AutoresPage from './pages/autores/autores-page';
import GridAutores from './pages/autores/grid-autores';
import EditorasPage from './pages/editoras/editoras-page';
import GridEditoras from './pages/editoras/grid-editoras';
import LivrosPage from './pages/livros/livros-page';
import GridLivros from './pages/livros/grid-livros';
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
              <Route path="/login" element={<LoginPage />} />
              <Route path="/" element={<ProtectedRoute><HomePage /></ProtectedRoute>} />
              <Route path="/autores" element={<ProtectedRoute><AutoresPage /></ProtectedRoute>} />
              <Route path="/autores/grid" element={<ProtectedRoute><GridAutores /></ProtectedRoute>} />
              <Route path="/editoras" element={<ProtectedRoute><EditorasPage /></ProtectedRoute>} />
              <Route path="/editoras/grid" element={<ProtectedRoute><GridEditoras /></ProtectedRoute>} />
              <Route path="/livros" element={<ProtectedRoute><LivrosPage /></ProtectedRoute>} />
              <Route path="/livros/grid" element={<ProtectedRoute><GridLivros /></ProtectedRoute>} />
              <Route path="/categorias" element={<ProtectedRoute><CategoriasPage /></ProtectedRoute>} />
              <Route path="/idiomas" element={<ProtectedRoute><IdiomasPage /></ProtectedRoute>} />
              <Route path="/usuarios" element={<ProtectedRoute><UsuariosPage /></ProtectedRoute>} />
            </Routes>
          </Box>
        </Box>
      </Router>
    </ThemeProvider>
  );
};

export default App;
