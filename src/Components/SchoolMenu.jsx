import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import { useNavigate } from "react-router-dom";

import { routes, ui } from '../Constants/constant';

const SchoolMenu = () => {
    const navigate = useNavigate();

    return (
        <AppBar position="static">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <Typography
                        variant="h6"
                        noWrap
                        onClick={() => navigate('/homepage')}
                        component="a"
                        sx={{
                            mr: 10,
                            display: { xs: 'none', md: 'flex' },
                            fontFamily: 'arial',
                            fontWeight: 800,
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        {ui.homeTitle}
                    </Typography>

                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                        {routes.pages.map((item, key) => (
                            <Button
                                key={key}
                                onClick={() => navigate(item.url)}
                                sx={{ my: 2, color: 'white', display: 'block' }}
                            >
                                {item.page}
                            </Button>
                        ))}
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>

    );
}

export default SchoolMenu;