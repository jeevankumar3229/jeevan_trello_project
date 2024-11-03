import { Box, Checkbox, Typography } from "@mui/material";
import { FaTimes } from "react-icons/fa";

import { deleteCheckItem, updateCheckItemState } from "../util/utilityFunctions";
import whiteImage from '../assets/Images/whitebg.jpg';

const CheckItem = ({ checkItem, index, checklistItemId, checkItems, setCheckItems, cardId }) => {
  const removeCheckItem = (index) => {
    const updatedCheckItems = checkItems.filter((_, i) => i !== index);
    setCheckItems(updatedCheckItems);
  };

  const handleDeleteCheckItem = async (checkItemId, index) => {
    const success = await deleteCheckItem(checkItemId, checklistItemId);
    if (success) {
      removeCheckItem(index);
    } else {
      console.error("Failed to delete the check item.");
    }
  };

  async function handleChange(itemId) {
    setCheckItems((prevItems) =>
        prevItems.map((item) => {
            if (item.id === itemId) {
                const newState = item.state === "complete" ? "incomplete" : "complete";
                
            
                updateCheckItemState(itemId, newState, cardId).then(status => {
                    console.log(status); 
                });

                return {
                    ...item,
                    state: newState, 
                };
            }
            return item;
        })
    );
}


  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        bgcolor: '#f0f0f0',
        p: 1,
        borderRadius: 1,
        mb: 1,
        backgroundImage:`url(${whiteImage})`
        ,border:'2px solid black'
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center" ,backgroundImage:`url(${whiteImage})`}}>
        <Checkbox
          checked={checkItem.state === "complete"}
          onChange={() => handleChange(checkItem.id)}
        />
        <Typography>{checkItem.name}</Typography>
      </Box>
      <FaTimes
        onClick={() => handleDeleteCheckItem(checkItem.id, index)}
        style={{ cursor: 'pointer', color: 'black' }}
      />
    </Box>
  );
};

export default CheckItem;
