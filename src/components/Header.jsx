import { useState, useContext } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Box, IconButton, Drawer, List, ListItem, ListItemButton, ListItemText, Divider, Badge, Menu, MenuItem, Avatar, ListItemIcon } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import FavoriteIcon from '@mui/icons-material/Favorite';
import popcornIconUrl from '../assets/popcorn-icon.png';

import { FavoritesContext } from '../context/FavoritesContext';

const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w200';

const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  // Estado para manejar el anclaje del menú de favoritos
  const [anchorEl, setAnchorEl] = useState(null);

  const { favorites } = useContext(FavoritesContext);

  const handleDrawerToggle = () => setMobileOpen(p => !p);
  const handleFavoritesMenuOpen = (event) => setAnchorEl(event.currentTarget);
  const handleFavoritesMenuClose = () => setAnchorEl(null);

  const navItems = [
    { text: 'Latest', path: '/category/latest' },
    { text: 'Popular', path: '/category/popular' },
    { text: 'Search', path: '/search' },
  ];
  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center', backgroundColor: '#111827', height: '100%' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: 2 }}>
        <Typography variant="h6" sx={{ color: '#22d3ee' }}>Menu</Typography>
        <IconButton sx={{ color: 'white' }}><CloseIcon /></IconButton>
      </Box>
      <Divider sx={{ borderColor: 'rgba(255, 255, 255, 0.12)' }}/>
      <List>
        {navItems.map((item) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton component={NavLink} to={item.path} sx={{ textAlign: 'center' }}>
              <ListItemText primary={item.text} sx={{ color: 'white' }} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <>
      <AppBar 
        component="nav" 
        position="fixed" 
        elevation={0}
        sx={{ 
          backgroundColor: 'rgba(31, 41, 55, 0.3)', 
          backdropFilter: 'blur(5px)',
        }}
      >
        <Toolbar sx={{ maxWidth: '1280px', width: '100%', mx: 'auto', px: { xs: 2, sm: 3, lg: 4 } }}>
          <Box component={NavLink} to="/" sx={{ flexGrow: 1, display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
            <Typography
              variant="h6"
              sx={{ color: '#22d3ee', fontWeight: 'bold', fontSize: '1.875rem' }}
            >
              My Movies
            </Typography>
            <img src={popcornIconUrl} alt="My Movies Logo" className="w-9 h-9 ml-3" />
          </Box>
          <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 2 }}>
            {navItems.map((item) => (
              <Button key={item.text} component={NavLink} to={item.path} sx={{ color: 'white', textTransform: 'none', fontSize: '1rem', padding: '8px 16px', position: 'relative', '&:after': { content: '""', position: 'absolute', width: '0%', height: '2px', bottom: '5px', left: '50%', transform: 'translateX(-50%)', backgroundColor: '#67e8f9', transition: 'width 0.3s ease-in-out', }, '&:hover:after': { width: '70%', }, '&.active': { color: '#67e8f9', }, '&.active:after': { width: '70%', } }}>
                {item.text}
              </Button>
            ))}
            {/* Ícono de Favoritos con contador */}
            <IconButton color="inherit" onClick={handleFavoritesMenuOpen}>
              <Badge badgeContent={favorites.length} color="error">
                <FavoriteIcon />
              </Badge>
            </IconButton>
          </Box>
          {/* Botón de menú hamburguesa para móvil */}
          <Box sx={{ display: { md: 'none' } }}>
            <IconButton color="inherit" onClick={handleFavoritesMenuOpen} sx={{ mr: 1 }}>
                <Badge badgeContent={favorites.length} color="error">
                  <FavoriteIcon />
                </Badge>
            </IconButton>
            <IconButton color="inherit" aria-label="open drawer" edge="end" onClick={handleDrawerToggle}>
              <MenuIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Menú desplegable de Favoritos */}
       <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleFavoritesMenuClose}
        slotProps={{
          paper: {
            sx: {
              backgroundColor: '#1f2937',
              color: 'white',
              border: '1px solid #4b5563', 
            },
          },
          list: {
            'aria-labelledby': 'favorites-button',
          },
        }}
      >
        {favorites.length > 0 ? (
          favorites.map((movie) => (
            <MenuItem 
              key={movie.id} 
              component={Link} 
              to={`/movie/${movie.id}`} 
              onClick={handleFavoritesMenuClose}
              sx={{ '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.1)' } }}
            >
              <Avatar src={`${IMAGE_BASE_URL}${movie.poster_path}`} sx={{ mr: 2 }} />
              <ListItemText primary={movie.title} />
            </MenuItem>
          ))
        ) : (
          <MenuItem disabled>No favorites yet</MenuItem>
        )}
      </Menu>

      <nav>
        <Drawer anchor="right" variant="temporary" open={mobileOpen} onClose={handleDrawerToggle} ModalProps={{ keepMounted: true }} sx={{ display: { xs: 'block', md: 'none' }, '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 240, backgroundColor: '#111827' }, }}>
          {drawer}
        </Drawer>
      </nav>
    </>
  );
};

export default Header;
