
import { Box, Typography, List, Button } from '@mui/material';
import { useState, useEffect } from 'react';
import { useParams} from 'react-router-dom'; 

import CreateList from './CreateList';
import ListItemCard from './ListItemCard';
import nightImage from '../assets/Images/night.jpg'; 
import whiteImage from '../assets/Images/whitebg.jpg';
import { fetchSingleBoard, fetchLists, handleCreateListSubmit } from '../util/utilityFunctions';


function SingleBoard({ boards, setBoards }) {
    const [singleBoard, setSingleBoard] = useState({});
    const [lists, setLists] = useState([]);
    const [popoverOpen, setPopoverOpen] = useState(false);
    const [buttonAnchor, setButtonAnchor] = useState(null);
    
    const { id } = useParams();

    useEffect(() => {
        fetchSingleBoard(id, setSingleBoard);
        fetchLists(id, setLists);
    }, []);

    const handleListAddButtonClick = (event) => {
        setPopoverOpen(true);
        setButtonAnchor(event.currentTarget); 
    };

    

    return (
        <>
            <Box 
                style={{
                    minHeight: "100vh",
                    backgroundImage: `url(${nightImage})`, 
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
                setLists={setLists}
            />
        </>
    );
}

export default SingleBoard;
