import React from "react";
import { Link } from "react-router-dom";
import { Box, Typography, Button } from "@mui/material";
import { FaExclamationTriangle } from "react-icons/fa";

const NotFoundPage = () => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      color="white" 
      textAlign="center"
      className="not-found-page"
      sx={{backgroundImage: `url('src/assets/Images/night.jpg')`}}
    >
      <FaExclamationTriangle className="icon" />
      <Typography variant="h1" className="title">404 Not Found</Typography>
      <Typography variant="body1" className="message">This page does not exist</Typography>
      <Button
        component={Link}
        to="/boards"
        variant="contained"
        className="go-back-button" // For custom CSS if needed
        sx={{
          mt: 2,color:"white",bgcolor:"black",border:'2px solid white'
        }}
      >
        Go Back
      </Button>
    </Box>
  );
};

export default NotFoundPage;
