// CardItem.js
import React, { useState } from 'react';
import { Typography, ListItem } from '@mui/material';
import { FaTimes } from 'react-icons/fa';

import { deleteCard } from '../util/utilityFunctions';
import CheckListPopUp from './CheckListPopUp';
import whiteImage from '../assets/Images/whitebg.jpg';

const CardItem = ({ card, cardIndex, cards, setCards }) => {

    const [opens,setOpens]=useState(false)

    const removeCard = (index) => {
        const updatedCards = cards.filter((_, i) => i !== index);
        setCards(updatedCards); 
    };

    const handleDeleteCard = async (cardId, index) => {
        const success = await deleteCard(cardId);
        if (success) {
            removeCard(index);
        } else {
            console.error('Failed to delete the card');
        }
    };

    function openChecklist(){
        setOpens(true)
    }

    return (
        <ListItem
            sx={{
             
                mb: 1,
                borderRadius: 1,
                p: 1,
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                backgroundImage:`url(${whiteImage})`,
                border:'2px solid black'
            }}
            onClick={openChecklist}
        >
            <Typography>{card.name}</Typography>
            <FaTimes
                onClick={() => handleDeleteCard(card.id, cardIndex)}
                style={{ cursor: 'pointer' }}
            />
            <CheckListPopUp opens={opens} setOpens={setOpens} card={card}/>
        </ListItem>

       

    );
};

export default CardItem;
