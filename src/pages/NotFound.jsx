import { Link } from 'react-router-dom';
import Layout from '../components/Layout';
import { Box, Typography, Button } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const NotFound = () => {
    return (
        <Layout>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    textAlign: 'center',
                    height: '60vh',
                    color: 'white',
                }}
            >
                <Typography
                    variant="h1"
                    component="h2"
                    fontWeight="bold"
                    sx={{ color: '#22d3ee', fontSize: { xs: '6rem', md: '8rem' } }}
                >
                    404
                </Typography>
                <Typography
                    variant="h4"
                    component="p"
                    fontWeight="500"
                    sx={{ mt: 2, mb: 4 }}
                >
                    Oops! Page Not Found.
                </Typography>
                <Typography 
                    variant="h6"
                    sx={{ color: 'rgb(156 163 175)', mb: 4 }}
                >
                    The page you are looking for might have been removed or is temporarily unavailable.
                </Typography>
                <Button
                    component={Link}
                    to="/"
                    variant="contained"
                    startIcon={<ArrowBackIcon />}
                    sx={{
                        backgroundColor: '#22d3ee',
                        color: 'black',
                        fontWeight: 'bold',
                        '&:hover': {
                            backgroundColor: '#67e8f9',
                        },
                    }}
                >
                    Go Back Home
                </Button>
            </Box>
        </Layout>
    );
};

export default NotFound;

