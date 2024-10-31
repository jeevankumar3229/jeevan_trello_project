import React from 'react'
import HomePage from './Pages/HomePage'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SingleBoardPage from './Pages/SingleBoardPage';
const App = () => {
  return (
    
     <BrowserRouter>
     <Routes>
       <Route
         path="/"
         element={
           <HomePage/>
         }
       />
          <Route
            path="/boards/:id"
            element={
              <SingleBoardPage/>
            }
          />
     </Routes>
   </BrowserRouter>
  )
}

export default App
