import { Box, CircularProgress, Typography } from '@mui/material';

const Loader = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-start',
        height: '50vh',
        pt: 10,
      }}
    >
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
        <CircularProgress color="primary" size={50} />
        <Typography 
          variant="h6" 
          sx={{ color: 'primary' }} 
        >
          Loading...
        </Typography>
      </Box>
    </Box>
  );
};

export default Loader;
