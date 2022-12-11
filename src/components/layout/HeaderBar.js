import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import SidePanel from './SidePanel';
import { useNavigate } from 'react-router-dom';

export default function HeaderBar() {
  const navigate = useNavigate();
  return (
    <Box>
      <AppBar position='static'>
        <Toolbar>
          <SidePanel />
          <Typography variant='h5' component='div' sx={{ flexGrow: 1 }} 
            onClick={() => navigate('/')} style={{cursor:'pointer'}}>
              Personal Trainer
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
}