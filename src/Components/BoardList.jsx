import React, { useEffect, useState } from 'react';
import { Box, Card, CardContent, CardMedia, Grid, Typography, Link, ButtonBase } from '@mui/material';
import { fetchBoards, handleCreateBoard } from '../util/utilityFunctions';
import Spinner from '../Components/Spinner.jsx';
import CreateBoard from './CreateBoard.jsx';

import axios from "axios";

const API_KEY = import.meta.env.VITE_API_KEY;
const TOKEN_KEY = import.meta.env.VITE_TOKEN_KEY;

const BoardList = () => {
    const [boards, setBoards] = useState([]);
    const [loading, setLoading] = useState(true);
    const [popoverOpen, setPopoverOpen] = useState(false);

    // Fetch boards on component mount
    useEffect(() => {
        const fetchData = async () => {
            const boardsData = await fetchBoards();
            setBoards(boardsData || []);
            setLoading(false);
        };

        fetchData();
    }, []);

    


    return (
        <>
            {loading ? (
                <Spinner loading={loading} />
            ) : (
                <Box sx={{ minHeight: "100vh", display: 'flex', flexDirection: 'column', width: 'auto', backgroundImage: `url('src/assets/Images/night.jpg')` }}>
                    <Typography variant="h4" sx={{ pl: 7, color: "white", mt: "10px" }}>Boards</Typography>
                    <Box sx={{ flexGrow: 1, p: 2 }}>
                        <Grid container spacing={2} sx={{ pl: 5, pr: 5 }}>
                            <Grid item xs={12} sm={6} md={3} key="board">
                                <ButtonBase
                                    onClick={() => setPopoverOpen(true)} // Open the popover
                                    sx={{ width: '100%', display: 'block' }}
                                >
                                    <Card sx={{ position: 'relative', borderRadius: 2, overflow: 'hidden', cursor: 'pointer' }}>
                                        <CardMedia
                                            component="img"
                                            height="150"
                                            image="src/assets/Images/whitebg.jpg"
                                        />
                                        <CardContent
                                            sx={{
                                                position: 'absolute',
                                                top: '50%',
                                                left: '50%',
                                                transform: 'translate(-50%, -50%)',
                                                textAlign: 'center'
                                            }}
                                        >
                                            <Typography
                                                variant="h6"
                                                sx={{
                                                    color: 'white',
                                                    fontWeight: 'bold',
                                                    textShadow: '0px 0px 5px rgba(0, 0, 0, 0.7)',
                                                }}
                                            >
                                                Create new board
                                            </Typography>
                                        </CardContent>
                                    </Card>
                                </ButtonBase>
                            </Grid>
                            {boards.length > 0 ? (
                                boards.map((data, index) => (
                                    <Grid item xs={12} sm={6} md={3} key={data.id || index}>
                                        <Link href={`/boards/${data.id}`} underline="none" sx={{ display: 'block' }}>
                                            <Card sx={{ position: 'relative', borderRadius: 2, overflow: 'hidden', cursor: 'pointer' }}>
                                                <CardMedia
                                                    component="img"
                                                    height="150"
                                                    image='src/assets/Images/whitebg.jpg'
                                                />
                                                <CardContent sx={{
                                                    position: 'absolute',
                                                    top: '50%',
                                                    left: '50%',
                                                    transform: 'translate(-50%, -50%)',
                                                    textAlign: 'center'
                                                }}>
                                                    <Typography
                                                        variant="h6"
                                                        sx={{
                                                            color: 'white',
                                                            fontWeight: 'bold',
                                                            textShadow: '0px 0px 5px rgba(0, 0, 0, 0.7)',
                                                        }}
                                                    >
                                                        {data.name}
                                                    </Typography>
                                                </CardContent>
                                            </Card>
                                        </Link>
                                    </Grid>
                                ))
                            ) : (
                                ""
                            )}
                        </Grid>
                    </Box>
                    {/* CreateBoard Popover */}
                    <CreateBoard isOpen={popoverOpen} onClose={() => setPopoverOpen(false)} handleSubmit={handleCreateBoard} setBoards={setBoards} />
                </Box>
            )}
        </>
    );
};

export default BoardList;
