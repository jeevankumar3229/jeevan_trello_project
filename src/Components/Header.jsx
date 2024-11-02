import { AppBar, Toolbar, Typography } from "@mui/material";

const Header = () => {
  return (
    <AppBar sx={{ background: 'black', height: '64px', position: 'static', width: '100%' }}>
      <Toolbar sx={{ display: 'flex', alignItems: 'center', height: "60px" }}>
        <img src="/src/assets/Images/trello.png" alt="Trello Logo" style={{ width: '50px', height: '50px', marginLeft: "39px" }} />
        <Typography variant="h3" sx={{ color: 'white', marginLeft: '10px' }}>
          Trello
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
