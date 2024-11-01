import { Box, Typography, List, Button } from '@mui/material';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchSingleBoard, fetchLists, handleCreateList, deleteList } from '../util/utilityFunctions';
import CreateList from './CreateList';
import { FaTimes } from 'react-icons/fa';

function SingleBoard({ boards, setBoards }) {
    const [singleBoard, setSingleBoard] = useState({});
    const [lists, setLists] = useState([]);
    const [popoverOpen, setPopoverOpen] = useState(false);
    const [buttonAnchor, setButtonAnchor] = useState(null);

    const { id } = useParams();

    const handleListAddButtonClick = (event) => {
        setPopoverOpen(true);
        setButtonAnchor(event.currentTarget); 
    };

    useEffect(() => {
        fetchSingleBoard(id, setSingleBoard);
        fetchLists(id, setLists);
    }, [id]);

  
    const removeList = (index) => {
        const updatedLists = lists.filter((_, i) => i !== index);
        setLists(updatedLists);
    };


    const handleDeleteList = async (listId, index) => {
        const success = await deleteList(listId);
        console.log(`Delete request for list ID ${listId} was ${success ? 'successful' : 'unsuccessful'}`);
        if (success) {
            removeList(index); 
        } else {
            console.error('Failed to delete the list');
        }
    };

 
    const addCard = (index) => {
        const newCardText = prompt("Enter card text");
        if (newCardText) {
            const updatedColumns = [...lists];
            updatedColumns[index].items.push(newCardText);
            setLists(updatedColumns);
        }
    };

    return (
        <>
            <Box>
                <Typography variant="h4" sx={{ pl: 7, mt: "20px", color: "black" }}>
                    {singleBoard.name}
                </Typography>
                <Box sx={{ display: "flex", ml: 5, mr: 5, p: 2, borderRadius: 1 }}>
                    {lists.map((list, index) => (
                        <List
                            key={list.id}
                            sx={{
                                bgcolor: 'black',
                                borderRadius: 1,
                                minWidth: '200px',
                                width: 'auto',
                                m: 1,
                                p: 1,
                                flexGrow: 1,
                                maxWidth: '100%',
                                overflow: 'hidden'
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
                        minWidth: '250px',
                        width: 'auto',
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
                handleSubmit={handleCreateList}
                setLists={setLists}
                id={id}
            />
        </>
    );
}

export default SingleBoard;
