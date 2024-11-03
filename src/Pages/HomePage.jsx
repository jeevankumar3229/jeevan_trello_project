import React from 'react';
import Header from '../Components/Header';
import BoardList from '../Components/BoardList';
import { Box } from '@mui/material';

const HomePage = ({boards,setBoards}) => {
  
  return (
    <>

      <BoardList  boards={boards} setBoards={setBoards}/>

    </>
  );
};

export default HomePage;
