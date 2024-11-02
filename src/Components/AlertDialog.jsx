import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Box, TextField } from '@mui/material';
import { FaTimes } from 'react-icons/fa';
import { useState, useEffect } from 'react';
import { fetchChecklists } from '../util/utilityFunctions';
import Checklist from './Checklist';
import axios from 'axios';

const API_KEY = import.meta.env.VITE_API_KEY;
const TOKEN_KEY = import.meta.env.VITE_TOKEN_KEY;

export default function AlertDialog({ opens, setOpens, card }) {
    const [inputValue, setInputValue] = useState("");
    const [checklist, setChecklist] = useState([]);

    useEffect(() => {
        fetchChecklists(card.id, setChecklist);
    }, [card.id]);

    const onSubmit = (event) => {
        event.preventDefault();
        handleCreateChecklist(inputValue);
        setInputValue("");
    };

    const handleCreateChecklist = async (name) => {
        if (name) {
            try {
                const response = await axios.post(
                    `https://api.trello.com/1/cards/${card.id}/checklists?name=${name}&key=${API_KEY}&token=${TOKEN_KEY}`
                );
                setChecklist((prevChecklists) => [...prevChecklists, response.data]);
            } catch (error) {
                console.error("Error creating checklist:", error);
            }
        }
    };

    const handleClose = () => {
        console.log("Closing dialog..."); // Debugging log
        setOpens(false);
    };

    return (
        <>
            <Dialog
                open={opens}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title" sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    {card.name}
                    <FaTimes 
                        onClick={(e) => {
                            e.stopPropagation(); // Prevent event propagation
                            handleClose(); 
                        }} 
                        style={{ cursor: 'pointer' }} 
                    />
                </DialogTitle>
                <DialogContent>
                    <Box>
                        <form onSubmit={onSubmit}>
                            <TextField
                                label="Create Checklist"
                                variant="outlined"
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                fullWidth
                            />
                            <Button variant="contained" size="small" type="submit" sx={{ mt: 1 }}>
                                Add Checklist
                            </Button>
                        </form>
                    </Box>
                    <Box>
                        {checklist.map((checklistItem, index) => (
                            <Checklist key={checklistItem.id} checklistItem={checklistItem} index={index} checklist={checklist} setChecklist={setChecklist} cardId={card.id} />
                        ))}
                    </Box>
                </DialogContent>
            </Dialog>
        </>
    );
}