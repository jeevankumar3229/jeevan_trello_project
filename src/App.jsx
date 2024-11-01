import React from 'react'
import HomePage from './Pages/HomePage'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SingleBoardPage from './Pages/SingleBoardPage';
import { useState } from 'react';
const App = () => {
  const [boards, setBoards] = useState([]);
  return (
    
     <BrowserRouter>
     <Routes>
       <Route
         path="/"
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
     </Routes>
   </BrowserRouter>
  )
}

export default App
