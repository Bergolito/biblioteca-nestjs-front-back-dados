import React, { useState } from 'react';
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  Button,
  Menu,
  MenuItem,
  IconButton,
} from '@mui/material';
import { Menu as MenuIcon, Book } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const [anchorElManutencao, setAnchorElManutencao] = useState<null | HTMLElement>(null);

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

  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
        >
          <Book />
        </IconButton>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Biblioteca Pessoal
        </Typography>
        
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button color="inherit" onClick={() => navigate('/autores')}>
            Autores
          </Button>
          
          <Button color="inherit" onClick={() => navigate('/editoras')}>
            Editoras
          </Button>
          
          <Button color="inherit" onClick={() => navigate('/livros')}>
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
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
