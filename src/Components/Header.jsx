import React from 'react';
import { AppBar, Typography, Toolbar } from '@mui/material';

const Header = () => {
  return (
    <AppBar sx={{ background: 'black',ckheight: '64px',position:'static' }}>
      <Toolbar sx={{ display: 'flex', height:"60px"}}>
        <img src="src/assets/Images/trello.png" alt="Trello Logo" style={{ width: '50px', height: '50px', marginLeft:"39px"}} />
        <Typography variant="h3" sx={{ color: 'white', marginLeft: '0px' }}>
          Trello
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
