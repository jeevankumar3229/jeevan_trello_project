// CardItem.js
import React from 'react';
import { Typography, ListItem } from '@mui/material';
import { FaTimes } from 'react-icons/fa';
import { deleteCard } from '../util/utilityFunctions';

const CardItem = ({ card, cardIndex, cards, setCards }) => {
    const removeCard = (index) => {
        const updatedCards = cards.filter((_, i) => i !== index);
        setCards(updatedCards); // Update the cards state to remove the deleted card
    };

    const handleDeleteCard = async (cardId, index) => {
        const success = await deleteCard(cardId);
        console.log(`Delete request for card ID ${cardId} was ${success ? 'successful' : 'unsuccessful'}`);
        if (success) {
            console.log("success");
            removeCard(index);
        } else {
            console.error('Failed to delete the card');
        }
    };

    return (
        <ListItem
            sx={{
                bgcolor: 'lightgray',
                mb: 1,
                borderRadius: 1,
                p: 1,
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
            }}
        >
            <Typography>{card.name}</Typography>
            <FaTimes
                onClick={() => handleDeleteCard(card.id, cardIndex)}
                style={{ cursor: 'pointer' }}
            />
        </ListItem>
    );
};

export default CardItem;
