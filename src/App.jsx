import React from 'react'
import HomePage from './Pages/HomePage'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SingleBoardPage from './Pages/SingleBoardPage';
import { useState } from 'react';
import NotFoundPage from './Pages/NotFoundPage';
const App = () => {
  const [boards, setBoards] = useState([]);
  return (
    
     <BrowserRouter>
     <Routes>
        <Route
        path='/'
        element={<NotFoundPage/>}/>
       <Route
         path="/boards"
         element={
           <HomePage boards={boards} setBoards={setBoards}/>
         }
       />
          <Route
            path="/boards/:id"
            element={
              <SingleBoardPage boards={boards} setBoards={setBoards}/>
            }
          />
          <Route
        path='*'
        element={<NotFoundPage/>}/>
     </Routes>
   </BrowserRouter>
  )
}

export default App
