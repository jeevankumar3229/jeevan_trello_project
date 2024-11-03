
import React, { useState, useEffect } from 'react';
import { Box, Typography, List, Button } from '@mui/material';
import axios from 'axios';
import { FaTimes } from 'react-icons/fa';

import { deleteList, fetchCardsForList ,handleCreateCardSubmit} from '../util/utilityFunctions';
import CreateCardPopper from './CreateCardPopper';
import whiteImage from '../assets/Images/whitebg.jpg';
import CardItem from './CardItem';

const ListItemCard = ({ list, index, lists, setLists }) => {
    const [cards, setCards] = useState([]);
    const [popoverOpen, setPopoverOpen] = useState(false);
    const [buttonAnchor, setButtonAnchor] = useState(null);

    useEffect(() => {
        fetchCardsForList(list.id, setCards);
    }, []);

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

    const handleListAddButtonClick = (event) => {
        setPopoverOpen(true);
        setButtonAnchor(event.currentTarget); 
    };

    return (
        <div>
            <List
                key={list.id}
                sx={{
                    bgcolor: 'black',
                    borderRadius: 1,
                    width: '200px',
                    m: 1,
                    p: 1,
                    flexGrow: 0,
                    flexShrink: 0,
                    flexBasis: '200px',
                    backgroundImage:`url(${whiteImage})`
                }}
            >
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography variant="h6" sx={{ color: "black" }}>
                        {list.name}
                    </Typography>
                    <FaTimes
                        onClick={() => handleDeleteList(list.id, index)}
                        style={{ color: 'black', cursor: 'pointer' }}
                    />
                </Box>

                {cards.map((card, cardIndex) => (
                    <CardItem 
                        key={card.id || cardIndex} 
                        card={card} 
                        cardIndex={cardIndex} 
                        cards={cards} 
                        setCards={setCards} 
                    />
                ))}

                <Button
                    variant="contained"
                    sx={{ width: '100%', mt: 1,bgcolor:"black",color:"white" }}
                    onClick={handleListAddButtonClick}

                >
                    Add a card
                </Button>
            </List>
            <CreateCardPopper
                isOpen={popoverOpen}
                onClose={() => setPopoverOpen(false)}
                anchorEl={buttonAnchor}
                handleSubmit={handleCreateCardSubmit}
                id={list.id}
                setCards={setCards}
            />
        </div>
    );
};

export default ListItemCard;
