// CardItem.js
import React, { useState } from 'react';
import { Typography, ListItem } from '@mui/material';
import { FaTimes } from 'react-icons/fa';
import { deleteCard } from '../util/utilityFunctions';
import CheckListPopUp from './CheckListPopUp';
import whiteImage from '../assets/Images/whitebg.jpg';
import { DiBlackberry } from 'react-icons/di';

const CardItem = ({ card, cardIndex, cards, setCards }) => {

    const [opens,setOpens]=useState(false)

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

       

    );C
};

export default CardItem;
