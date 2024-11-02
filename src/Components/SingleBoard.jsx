import { fetchSingleBoard, fetchLists } from '../util/utilityFunctions';
import { Box, Typography, List, Button } from '@mui/material';
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import CreateList from './CreateList';
import axios from 'axios'; // Ensure axios is imported
import ListItemCard from './ListItemCard';
import nightImage from '../assets/Images/night.jpg'; // Import the image
import whiteImage from '../assets/Images/whitebg.jpg';

const API_KEY = import.meta.env.VITE_API_KEY;
const TOKEN_KEY = import.meta.env.VITE_TOKEN_KEY;

function SingleBoard({ boards, setBoards }) {
    const [singleBoard, setSingleBoard] = useState({});
    const [lists, setLists] = useState([]);
    const [popoverOpen, setPopoverOpen] = useState(false);
    const [buttonAnchor, setButtonAnchor] = useState(null);
    
    const { id } = useParams();
    const navigate = useNavigate(); // Initialize useNavigate

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
                setLists((prevLists) => [...prevLists, response.data]); // Add the new list from the response
            } catch (error) {
                console.error("Error creating list:", error);
            }
            setPopoverOpen(false); // Close the popover after creating the list
        }
    };

    

    return (
        <>
            <Box 
                style={{
                    minHeight: "100vh",
                    backgroundImage: `url(${nightImage})`, // Use the imported image
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    padding: 3,
                }}
            >
                <Button 
                    variant="outlined" 
                    href='/boards'
                    sx={{ color: "white", borderColor: "white", mt: 3,ml:7 ,mb:2}}
                >
                    Back
                </Button>
                <Typography variant="h4" sx={{ color: "white", mb: 2, ml: 7 }}>
                    {singleBoard.name}
                </Typography>
                <Box sx={{ display: "flex", flexWrap: 'wrap', gap: 2, ml: 7 }}>
                    {lists.map((list, index) => (
                        <ListItemCard key={list.id} list={list} index={index} lists={lists} setLists={setLists}/>
                    ))}
                    <List sx={{
                        borderRadius: 1,
                        width: '250px',
                        p: 1,
                    }}>
                        <Button 
                            variant="contained" 
                            onClick={handleListAddButtonClick} 
                            sx={{ p: 2, color: "black", backgroundImage: `url(${whiteImage})` }}
                        >
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
