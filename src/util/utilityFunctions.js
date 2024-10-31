const API_KEY = import.meta.env.VITE_API_KEY;
const TOKEN_KEY= import.meta.env.VITE_TOKEN_KEY;
import axios from "axios";


async function fetchBoards() {
    try {
        const response = await axios.get(
            `https://api.trello.com/1/members/me/boards?key=${API_KEY}&token=${TOKEN_KEY}`
        );
        return response.data;
    } catch (error) {
        console.log(error);
        return [];
    }
};

async function handleCreateBoard(name, setBoards) {
    if (name) {
        try {
            const response = await axios.post(
                `https://api.trello.com/1/boards/?name=${name}&key=${API_KEY}&token=${TOKEN_KEY}`
            );

            // Use the response data to update the boards state
            setBoards((prevBoards) => [...prevBoards, response.data]); // Add the new board from the response
        } catch (error) {
            console.log(error);
        }
    }
}

export {fetchBoards, handleCreateBoard}