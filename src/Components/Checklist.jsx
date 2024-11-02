import { Typography, Card, CardContent, Box, TextField, Button,LinearProgress } from "@mui/material";
import { FaTimes } from "react-icons/fa";
import { deleteChecklist ,fetchCheckItems} from "../util/utilityFunctions";
import { useState,useEffect } from "react";
import CheckItem from "./CheckItem";

const Checklist = ({ checklistItem, index, checklist, setChecklist, cardId }) => {
    const [checkItems,setCheckItems]=useState([])
    useEffect(() => {
        fetchCheckItems(checklist.id,setCheckItems);
    }, [checklist.id]);

    const handleDeleteChecklist = async (checklistId) => {
        const success = await deleteChecklist(checklistId, cardId);
        console.log(`Delete request for checklist ID ${checklistId} was ${success ? 'successful' : 'unsuccessful'}`);
        if (success) {
            console.log("Checklist item deleted successfully");
            // Remove the deleted checklist item from the state
            setChecklist((prevChecklist) =>
                prevChecklist.filter((item) => item.id !== checklistId)
            );
        } else {
            console.error('Failed to delete the checklist item');
        }
    };

    return (
        <Card sx={{ margin: "8px 0" }}>
            <CardContent>
                <Box
                    sx={{
                        mb: 1,
                        borderRadius: 1,
                        p: 1,
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                    }}
                >
                    <Typography variant="h6">{checklistItem.name}</Typography>
                    <FaTimes
                        onClick={() => handleDeleteChecklist(checklistItem.id)}
                        style={{ cursor: 'pointer' }}
                    />
                </Box>
                <form >
                    <Box sx={{ display: "flex", alignItems: "center", my: 3 }}>
                        <TextField
                            variant="outlined"
                            // value={newCheckItemName}
                            // onChange={(e) => setNewCheckItemName(e.target.value)}
                            placeholder="Add check item"
                            required
                            sx={{ flex: 1, mr: 1 }}
                        />
                        <Button type="submit" variant="contained">Add</Button>
                    </Box>
                    <Box sx={{ position: "relative", mb: 2 }}>
                        <Typography
                            variant="body2"
                            sx={{
                                position: "absolute",
                                top: -20,
                                left: 0,
                                padding: '0 8px',
                                color: '#1976D2',
                                fontWeight: 'bold',
                            }}
                        >
                            {/* {progress}% */}
                        </Typography>
                        <LinearProgress
                            variant="determinate"
                            // value={progress}
                            // color={progress === 100 ? "primary" : "inherit"}
                        />
                    </Box>
                    <Box>
                    {checkItems.map((checkItem)=>(
                        <CheckItem checkItem={checkItem}/>
                    ))}
                    </Box>
                </form>

            </CardContent>
        </Card>
    );
};

export default Checklist;
