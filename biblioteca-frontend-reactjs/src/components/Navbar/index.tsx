import React, { useState, useEffect } from 'react';
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  Button,
  Menu,
  MenuItem,
  IconButton,
  Chip,
} from '@mui/material';
import { Menu as MenuIcon, Book, Person, Logout } from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';
import { getUsuario, logout } from '../../services/auth-service';

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [anchorElManutencao, setAnchorElManutencao] = useState<null | HTMLElement>(null);
  const [nomeUsuario, setNomeUsuario] = useState<string>('');

  useEffect(() => {
    const usuario = getUsuario();
    console.log('Usuario do localStorage:', usuario);
    if (usuario && usuario.nome) {
      setNomeUsuario(usuario.nome);
    }
  }, [location]);

  const handleManutencaoClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElManutencao(event.currentTarget);
  };

  const handleManutencaoClose = () => {
    setAnchorElManutencao(null);
  };

  const handleMenuItemClick = (path: string) => {
    navigate(path);
    handleManutencaoClose();
  };

  const handleLogout = () => {
    logout();
    setNomeUsuario('');
    navigate('/login');
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
          onClick={() => navigate('/')}
        >
          <Book />
        </IconButton>
        <Typography variant="h6" component="div" sx={{ mr: 4 }}>
          Biblioteca Pessoal
        </Typography>
        
        <Box sx={{ display: 'flex', gap: 2, flexGrow: 1, justifyContent: 'center' }}>

          <Button color="inherit" onClick={() => navigate('/autores/grid')}>
            Autores
          </Button>
          
          <Button color="inherit" onClick={() => navigate('/editoras/grid')}>
            Editoras
          </Button>
          
          <Button color="inherit" onClick={() => navigate('/livros/grid')}>
            Livros
          </Button>
          
          <Button
            color="inherit"
            onClick={handleManutencaoClick}
            endIcon={<MenuIcon />}
          >
            Manutenção
          </Button>
          <Menu
            anchorEl={anchorElManutencao}
            open={Boolean(anchorElManutencao)}
            onClose={handleManutencaoClose}
          >

            <MenuItem onClick={() => handleMenuItemClick('/autores')}>
              Autores
            </MenuItem>
            <MenuItem onClick={() => handleMenuItemClick('/editoras')}>
              Editoras
            </MenuItem>
            <MenuItem onClick={() => handleMenuItemClick('/livros')}>
              Livros
            </MenuItem>

            <MenuItem onClick={() => handleMenuItemClick('/categorias')}>
              Categorias
            </MenuItem>
            <MenuItem onClick={() => handleMenuItemClick('/idiomas')}>
              Idiomas
            </MenuItem>
            <MenuItem onClick={() => handleMenuItemClick('/usuarios')}>
              Usuários
            </MenuItem>
          </Menu>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Chip
            icon={<Person />}
            label={`Olá, ${nomeUsuario || 'usuário'}`}
            color="primary"
            variant="outlined"
            sx={{ 
              color: 'white', 
              borderColor: 'white',
              '& .MuiChip-icon': {
                color: 'white'
              }
            }}
          />
          <Button
            color="inherit"
            size="small"
            startIcon={<Logout />}
            onClick={handleLogout}
            sx={{ 
              fontSize: '0.875rem',
              textTransform: 'none'
            }}
          >
            Sair
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
