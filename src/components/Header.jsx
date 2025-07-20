import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Box, IconButton, Drawer, List, ListItem, ListItemButton, ListItemText, Divider } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';

const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const navItems = [
    { text: 'Latest', path: '/latest' },
    { text: 'Popular', path: '/popular' },
    { text: 'Search', path: '/search' },
  ];

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center', backgroundColor: '#111827', height: '100%' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: 2 }}>
        <Typography variant="h6" sx={{ color: '#22d3ee' }}>
          Menu
        </Typography>
        <IconButton sx={{ color: 'white' }}>
            <CloseIcon />
        </IconButton>
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
      <AppBar component="nav" position="static" sx={{ backgroundColor: '#1f2937' }}>
        {/* El Toolbar ahora tiene un ancho máximo y el mismo padding que el main para una alineación perfecta */}
        <Toolbar sx={{ maxWidth: '1280px', width: '100%', mx: 'auto', px: { xs: 2, sm: 3, lg: 4 } }}>
          {/* Título */}
          <Typography
            variant="h6"
            component={NavLink}
            to="/"
            sx={{ flexGrow: 1, color: '#22d3ee', textDecoration: 'none', fontWeight: 'bold', fontSize: '1.875rem' }}
          >
            Ada Movies
          </Typography>

          {/* Links de navegación para desktop */}
          <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 2 }}>
            {navItems.map((item) => (
              <Button
                key={item.text}
                component={NavLink}
                to={item.path}
                sx={{
                  color: 'white',
                  textTransform: 'none',
                  fontSize: '1rem',
                  padding: '8px 16px',
                  position: 'relative',
                  '&:after': {
                    content: '""',
                    position: 'absolute',
                    width: '0%',
                    height: '2px',
                    bottom: '5px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    backgroundColor: '#67e8f9',
                    transition: 'width 0.3s ease-in-out',
                  },
                  '&:hover:after': {
                    width: '70%',
                  },
                  '&.active': {
                    color: '#67e8f9',
                  },
                  '&.active:after': {
                    width: '70%',
                  }
                }}
              >
                {item.text}
              </Button>
            ))}
          </Box>
          
          {/* Icono de hamburguesa */}
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="end"
            onClick={handleDrawerToggle}
            sx={{ display: { md: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      <nav>
        <Drawer
          anchor="right"
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true }}
          sx={{
            display: { xs: 'block', md: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 240, backgroundColor: '#111827' },
          }}
        >
          {drawer}
        </Drawer>
      </nav>
    </>
  );
};

export default Header;