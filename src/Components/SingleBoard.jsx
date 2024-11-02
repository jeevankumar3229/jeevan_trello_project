import { fetchSingleBoard, fetchLists, deleteList, fetchCardsForList } from '../util/utilityFunctions';
import { Box, Typography, List, Button, ListItem } from '@mui/material';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import CreateList from './CreateList';
import { FaTimes } from 'react-icons/fa';
import axios from 'axios'; // Ensure axios is imported
const API_KEY = import.meta.env.VITE_API_KEY;
const TOKEN_KEY = import.meta.env.VITE_TOKEN_KEY;
import ListItemCard from './ListItemCard';

function SingleBoard({ boards, setBoards }) {
    const [singleBoard, setSingleBoard] = useState({});
    const [lists, setLists] = useState([]);
    const [popoverOpen, setPopoverOpen] = useState(false);
    const [buttonAnchor, setButtonAnchor] = useState(null);

    const { id } = useParams();

    useEffect(() => {
        fetchSingleBoard(id, setSingleBoard);
        fetchLists(id, setLists);
    }, [id]);

    const handleListAddButtonClick = (event) => {
        setPopoverOpen(true);
        setButtonAnchor(event.currentTarget); 
    };

    const handleCreateListSubmit = async (name) => {
        if (name) {
            try {
                const response = await axios.post(
                    `https://api.trello.com/1/boards/${id}/lists?name=${name}&key=${API_KEY}&token=${TOKEN_KEY}`
                );

                // Use the response data to update the lists state
                setLists((prevLists) => [...prevLists ,response.data ]); // Add the new list from the response
            } catch (error) {
                console.error("Error creating list:", error);
            }
            setPopoverOpen(false); // Close the popover after creating the list
        }
    }

    return (
        <>
            <Box>
                <Typography variant="h4" sx={{ pl: 7, mt: "20px", color: "black" }}>
                    {singleBoard.name}
                </Typography>
                <Box sx={{ display: "flex", ml: 5, mr: 5, p: 2, borderRadius: 1, overflow: 'hidden' }}>
                    {lists.map((list, index) => (
                        <ListItemCard list={list} index={index} lists={lists} setLists={setLists}/>
                    ))}
                    <List sx={{
                        bgcolor: 'rgba(255, 255, 255, 0.5)',
                        borderRadius: 1,
                        width: '200px', // Ensure the add list button also has a fixed width
                        p: 1,
                    }}>
                        <Button variant="contained" color="secondary" onClick={handleListAddButtonClick} sx={{ p: 2 }}>
                            + Add another list
                        </Button>
                    </List>
                </Box>
            </Box>
            <CreateList
                isOpen={popoverOpen}
                onClose={() => setPopoverOpen(false)}
                anchorEl={buttonAnchor}
                handleSubmit={handleCreateListSubmit}
                id={id}
            />
        </>
    );
}

export default SingleBoard;
