// CreateList.jsx

import React, { useState } from "react";
import { Button, Popover, TextField, Stack, Typography, Box } from "@mui/material";

const CreateCardPopper = ({ isOpen, onClose, anchorEl, handleSubmit, id }) => { // Removed setLists from here
  const [inputValue, setInputValue] = useState("");

  const onSubmit = (event) => {
    event.preventDefault();
    handleSubmit(inputValue); // Just send inputValue
    setInputValue(""); 
    onClose(); 
  };

  return (
    <Popover
      open={isOpen}
      anchorEl={anchorEl} 
      onClose={onClose}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'center',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'center',
      }}
    >
      <Box
        sx={{
          p: 2,
          borderRadius: 2,
          bgcolor: 'background.paper',
          boxShadow: 3,
          position: 'relative',
          width: 300,
          backgroundImage: `url('src/assets/Images/whitebg.jpg')`
        }}
      >
        <Button
          onClick={onClose}
          sx={{
            position: 'absolute',
            top: '20px',
            right: '-10px',
            fontSize: '15px',
            padding: '0px',
            marginRight: '25px',
            bgcolor: "black"
          }}
          variant="contained"
        >
          X
        </Button>
        <form onSubmit={onSubmit}>
          <Stack spacing={2}>
            <Typography variant="h6">Create Card</Typography>
            <TextField
              label="Create Card"
              variant="outlined"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              fullWidth
            />
            <Button variant="contained" sx={{ bgcolor: "black" }} type="submit">
              Submit
            </Button>
          </Stack>
        </form>
      </Box>
    </Popover>
  );
};

export default CreateCardPopper;