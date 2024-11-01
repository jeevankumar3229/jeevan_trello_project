const API_KEY = import.meta.env.VITE_API_KEY;
const TOKEN_KEY = import.meta.env.VITE_TOKEN_KEY;
import axios from "axios";


async function fetchBoards(setBoards, setLoading) {
    try {
        const response = await axios.get(
            `https://api.trello.com/1/members/me/boards?key=${API_KEY}&token=${TOKEN_KEY}`
        );

        setBoards(response.data);
        setLoading(false);
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


async function fetchSingleBoard(id, setSingleBoard) {
    try {
        const response = await axios.get(`https://api.trello.com/1/boards/${id}?key=${API_KEY}&token=${TOKEN_KEY}`)

        setSingleBoard(response.data);

    } catch (error) {
        console.log(error);
        return [];
    }
}


async function fetchLists(id,setLists) {
    try {
        const response = await axios.get(
            `https://api.trello.com/1/boards/${id}/lists?key=${API_KEY}&token=${TOKEN_KEY}`
        );

        setLists(response.data);

    } catch (error) {
        console.log(error);
        return [];
    }
};

async function handleCreateList(id,name,setLists) {
    if (name) {
        try {
            const response = await axios.post(
                `https://api.trello.com/1/boards/${id}/lists?name=${name}&key=${API_KEY}&token=${TOKEN_KEY}`
            );

            // Use the response data to update the boards state
            setLists((prevLists) => [...prevLists, response.data]); // Add the new board from the response
        } catch (error) {
            console.log(error);
        }
    }
}

async function deleteList(id) {
    try {
        const response = await axios.put(
            `https://api.trello.com/1/lists/${id}/closed?value=true&key=${API_KEY}&token=${TOKEN_KEY}`
        );
        return response.status === 200;
    } catch (error) {
        console.error(`Error deleting list: ${error.message}`);
        return false;
    }
}




export { fetchBoards, handleCreateBoard, fetchSingleBoard ,fetchLists,handleCreateList,deleteList}
