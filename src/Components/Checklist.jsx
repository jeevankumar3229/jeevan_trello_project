import { Typography, Card, CardContent, Box, TextField, Button, LinearProgress } from "@mui/material";
import { FaTimes } from "react-icons/fa";
import { deleteChecklist, fetchCheckItems } from "../util/utilityFunctions";
import { useState, useEffect } from "react";
import CheckItem from "./CheckItem";
import axios from 'axios'; // Ensure axios is imported
import whiteImage from '../assets/Images/whitebg.jpg';

const API_KEY = import.meta.env.VITE_API_KEY;
const TOKEN_KEY = import.meta.env.VITE_TOKEN_KEY;

const Checklist = ({ checklistItem, index, checklist, setChecklist, cardId }) => {
    const [checkItems, setCheckItems] = useState([]);
    const [inputValue, setInputValue] = useState("");

    useEffect(() => {
        fetchCheckItems(checklistItem.id, setCheckItems);
    }, [checklistItem]);

    const handleDeleteChecklist = async (checklistId) => {
        const success = await deleteChecklist(checklistId, cardId);
        console.log(`Delete request for checklist ID ${checklistId} was ${success ? 'successful' : 'unsuccessful'}`);
        if (success) {
            console.log("Checklist item deleted successfully");
            setChecklist((prevChecklist) =>
                prevChecklist.filter((item) => item.id !== checklistId)
            );
        } else {
            console.error('Failed to delete the checklist item');
        }
    };

    const calculateProgress = () => {
        const checked = checkItems.filter(
          (item) => item.state === "complete"
        ).length;
        return (checked / checkItems.length) * 100 || 0; // Avoid NaN when there are no checkItems
      };

    const handleCreateCheckItem = async (event) => {
        event.preventDefault(); // Prevent the default form submission
        if (inputValue) {
            try {
                const response = await axios.post(
                    `https://api.trello.com/1/checklists/${checklistItem.id}/checkItems?name=${inputValue}&key=${API_KEY}&token=${TOKEN_KEY}`
                );
                setCheckItems((prevCheckItems) => [...prevCheckItems, response.data]);
                setInputValue(""); // Clear input after adding
            } catch (error) {
                console.error("Error creating checklist item:", error);
            }
        }
    };

    return (
        <Card sx={{ margin: "8px 0", backgroundImage:`url(${whiteImage})`, border:'2px solid black' }}>
            <CardContent>
                <Box
                    sx={{
                        mb: 1,
                        borderRadius: 1,
                        p: 1,
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                    }}
                >
                    <Typography variant="h6">{checklistItem.name}</Typography>
                    <FaTimes
                        onClick={() => handleDeleteChecklist(checklistItem.id)}
                        style={{ cursor: 'pointer' }}
                    />
                </Box>
                <form onSubmit={handleCreateCheckItem}>
                    <Box sx={{ display: "flex", alignItems: "center", my: 3 }}>
                        <TextField
                            variant="outlined"
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            placeholder="Add check item"
                            required
                            sx={{ flex: 1, mr: 1 }}
                        />
                        <Button type="submit" variant="contained" sx={{ bgcolor: "black", color: "white" }}>Add</Button>
                    </Box>
                    <Box sx={{ position: "relative", mb: 2 }}>
                        <Typography
                            variant="body2"
                            sx={{
                                position: "absolute",
                                top: -20,
                                left: -10,
                                padding: '0 8px',
                                color: 'black',
                                fontWeight: 'bold',
                            }}
                        >
                            {calculateProgress() > 0 ? calculateProgress() + "%" : 0 + "%"}
                        </Typography>
                        <LinearProgress
                            variant="determinate"
                            value={calculateProgress()} // This value can be updated based on your logic
                            sx={{
                                height: 4,
                                bgcolor: 'grey.200', // Background color of the progress bar
                                '& .MuiLinearProgress-bar': {
                                    bgcolor: 'black', // Progress color
                                },
                            }}
                        />
                    </Box>
                    <Box>
                        {checkItems.map((checkItem, index) => (
                            <CheckItem key={checkItem.id} checkItem={checkItem} index={index} checklistItemId={checklistItem.id} checkItems={checkItems} setCheckItems={setCheckItems} cardId={cardId} />
                        ))}
                    </Box>
                </form>
            </CardContent>
        </Card>
    );
};

export default Checklist;
