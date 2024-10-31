import React, { useState } from "react";
import {
  Button,
  Popover,
  TextField,
  Stack,
  Typography,
  Box,
} from "@mui/material";

const CreateBoard = ({ isOpen, onClose, handleSubmit , setBoards}) => {
  const [inputValue, setInputValue] = useState("");

  const onSubmit = (event) => {
    event.preventDefault();
    handleSubmit(inputValue,setBoards); // Call the parent's handleSubmit with the input value
    setInputValue(""); // Clear the input after submission
    onClose(); // Close the popover
  };

  return (
    <Popover
      open={isOpen}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'center',
      }}
      transformOrigin={{
        vertical: 'bottom',
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
            <Typography variant="h6">Create Board</Typography>
            <TextField
              label="Create Board"
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

export default CreateBoard;
