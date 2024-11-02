import { fetchSingleBoard, fetchLists, deleteList, fetchCardsForList } from '../util/utilityFunctions';
import { Box, Typography, List, Button, ListItem } from '@mui/material';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import CreateList from './CreateList';
import { FaTimes } from 'react-icons/fa';
import axios from 'axios'; // Ensure axios is imported
import Spinner from './Spinner'; // Import Spinner component

const API_KEY = import.meta.env.VITE_API_KEY;
const TOKEN_KEY = import.meta.env.VITE_TOKEN_KEY;

function SingleBoard({ boards, setBoards }) {
    const [singleBoard, setSingleBoard] = useState({});
    const [lists, setLists] = useState([]);
    const [loading, setLoading] = useState(true); // Loading state
    const [popoverOpen, setPopoverOpen] = useState(false);
    const [buttonAnchor, setButtonAnchor] = useState(null);
    const { id } = useParams();

    const handleListAddButtonClick = (event) => {
        setPopoverOpen(true);
        setButtonAnchor(event.currentTarget); 
    };

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const boardData = await fetchSingleBoard(id);
                setSingleBoard(boardData);
                const fetchedLists = await fetchLists(id);
                console.log('Fetched Lists:', fetchedLists); // Log fetched lists
                const updatedLists = await Promise.all(
                    fetchedLists.map(async (list) => {
                        const cards = await fetchCardsForList(list.id);
                        console.log(`Fetched cards for list ${list.id}:`, cards); // Log fetched cards
                        return { ...list, items: cards }; // Add cards as 'items'
                    })
                );
                setLists(updatedLists);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
            setLoading(false);
        };
        fetchData();
    }, [id]);

    const removeList = (index) => {
        const updatedLists = lists.filter((_, i) => i !== index);
        console.log('Updated Lists after removal:', updatedLists); // Log updated lists
        setLists(updatedLists);
    };

    const handleDeleteList = async (listId, index) => {
        setLoading(true); // Start loading when deleting a list
        const success = await deleteList(listId);
        console.log(`Delete request for list ID ${listId} was ${success ? 'successful' : 'unsuccessful'}`);
        if (success) {
            removeList(index); 
        } else {
            console.error('Failed to delete the list');
        }
        setLoading(false); // Stop loading
    };

    const addCard = (index) => {
        const newCardText = prompt("Enter card text");
        if (newCardText) {
            const updatedLists = [...lists];
            updatedLists[index].items = updatedLists[index].items || []; // Ensure items array exists
            updatedLists[index].items.push({ id: Date.now(), name: newCardText }); // Add new card as an object with unique id
            console.log('Updated Lists after adding card:', updatedLists); // Log updated lists
            setLists(updatedLists); // Update state with new lists
        }
    };

    const handleCreateListSubmit = async (name) => {
        if (name) {
            try {
                const response = await axios.post(
                    `https://api.trello.com/1/boards/${id}/lists?name=${name}&key=${API_KEY}&token=${TOKEN_KEY}`
                );
                console.log('Created list response:', response.data); // Log created list response
                setLists((prevLists) => [response.data, ...prevLists]); // Add the new list from the response
            } catch (error) {
                console.error("Error creating list:", error);
            }
            setPopoverOpen(false); // Close the popover after creating the list
        }
    };

    if (loading) return <Spinner loading={loading} />; // Show loading spinner while fetching

    return (
        <>
            <Box>
                <Typography variant="h4" sx={{ pl: 7, mt: "20px", color: "black" }}>
                    {singleBoard.name}
                </Typography>
                <Box sx={{ display: "flex", ml: 5, mr: 5, p: 2, borderRadius: 1, overflow: 'hidden' }}>
                    {lists.map((list, index) => (
                        <List
                            key={list.id}
                            sx={{
                                bgcolor: 'black',
                                borderRadius: 1,
                                width: '200px', // Set fixed width for each list
                                m: 1,
                                p: 1,
                                flexGrow: 0,
                                flexShrink: 0,
                                flexBasis: '200px' // Ensure consistent width
                            }}
                        >
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <Typography variant="h6" sx={{ color: "white" }}>
                                    {list.name}
                                </Typography>
                                <FaTimes 
                                    onClick={() => handleDeleteList(list.id, index)}
                                    style={{ color: 'white', cursor: 'pointer' }} 
                                />
                            </Box>
                          
                            {/* Display each card's name */}
                            {list.items && list.items.map((item) => (
                                <ListItem
                                    key={item.id} // Use item.id for stable keys
                                    sx={{
                                        bgcolor: 'lightgray',
                                        mb: 1,
                                        borderRadius: 1,
                                        p: 1,
                                        textAlign: 'center'
                                    }}
                                >
                                    {item.name}
                                </ListItem>
                            ))}
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={() => addCard(index)}
                                sx={{ width: '100%', mt: 1 }}
                            >
                                Add a card
                            </Button>
                        </List>
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
