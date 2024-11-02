// ListItemCard.js
import React, { useState, useEffect } from 'react';
import { Box, Typography, List, Button } from '@mui/material';
import CardItem from './CardItem';
import { FaTimes } from 'react-icons/fa';
import { deleteList, fetchCardsForList } from '../util/utilityFunctions';
import CreateCardPopper from './CreateCardPopper';
import axios from 'axios';

const API_KEY = import.meta.env.VITE_API_KEY;
const TOKEN_KEY = import.meta.env.VITE_TOKEN_KEY;

const ListItemCard = ({ list, index, lists, setLists }) => {
    const [cards, setCards] = useState([]);
    const [popoverOpen, setPopoverOpen] = useState(false);
    const [buttonAnchor, setButtonAnchor] = useState(null);

    useEffect(() => {
        fetchCardsForList(list.id, setCards);
    }, [list.id]);

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

    const handleCreateListSubmit = async (name) => {
        if (name) {
            try {
                const response = await axios.post(
                    `https://api.trello.com/1/cards?idList=${list.id}&name=${name}&key=${API_KEY}&token=${TOKEN_KEY}`
                );
                setCards((prevCards) => [...prevCards, response.data]);
            } catch (error) {
                console.error("Error creating list:", error);
            }
            setPopoverOpen(false);
        }
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
                    flexBasis: '200px'
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
                    color="primary"
                    sx={{ width: '100%', mt: 1 }}
                    onClick={handleListAddButtonClick}
                >
                    Add a card
                </Button>
            </List>
            <CreateCardPopper
                isOpen={popoverOpen}
                onClose={() => setPopoverOpen(false)}
                anchorEl={buttonAnchor}
                handleSubmit={handleCreateListSubmit}
                id={list.id}
            />
        </div>
    );
};

export default ListItemCard;
