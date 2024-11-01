import React from 'react'
import Header from '../Components/Header'
import SingleBoard from '../Components/SingleBoard'

const SingleBoardPage = ({boards,setBoards}) => {
  return (
    <div>
      <Header/>
      <SingleBoard boards={boards} setBoards={setBoards}/>
    </div>
  )
}

export default SingleBoardPage
