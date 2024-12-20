const API_KEY = import.meta.env.VITE_API_KEY;
const TOKEN_KEY = import.meta.env.VITE_TOKEN_KEY;
const URL=import.meta.env.VITE_URL;
import axios from "axios";


async function fetchBoards(setBoards) {
    try {
        const response = await axios.get(
            `${URL}/members/me/boards?key=${API_KEY}&token=${TOKEN_KEY}`
        );

        setBoards(response.data);
    } catch (error) {
        console.log(error);
        return [];
    }
};


async function handleCreateBoard(name, setBoards) {
    if (name) {
        try {
            const response = await axios.post(
                `${URL}/boards/?name=${name}&key=${API_KEY}&token=${TOKEN_KEY}`
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
        const response = await axios.get(`${URL}/boards/${id}?key=${API_KEY}&token=${TOKEN_KEY}`)

        setSingleBoard(response.data);

    } catch (error) {
        console.log(error);
        return [];
    }
}


async function fetchLists(id,setLists) {
    try {
        const response = await axios.get(
            `${URL}/boards/${id}/lists?key=${API_KEY}&token=${TOKEN_KEY}`
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
                `${URL}/boards/${id}/lists?name=${name}&key=${API_KEY}&token=${TOKEN_KEY}`
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
            `${URL}/lists/${id}/closed?value=true&key=${API_KEY}&token=${TOKEN_KEY}`
        );
        return response.status === 200;
    } catch (error) {
        console.error(`Error deleting list: ${error.message}`);
        return false;
    }
}


async function fetchCardsForList(id, setCards){
    try {
        const response = await axios.get(
            `${URL}/lists/${id}/cards?key=${API_KEY}&token=${TOKEN_KEY}`
        );
        setCards(response.data)

    } catch (error) {
        console.log(error);
        return [];
    }
}

async function deleteCard(id) {
    try {
        const response = await axios.delete(
            `${URL}/cards/${id}?key=${API_KEY}&token=${TOKEN_KEY}`
        );
        return response.status === 200;
    } catch (error) {
        console.error(`Error deleting list: ${error.message}`);
        return false;
    }
}

async function fetchChecklists(id, setChecklist){
    try {
        const response = await axios.get(
            `${URL}/cards/${id}/checklists?key=${API_KEY}&token=${TOKEN_KEY}`
        );
        setChecklist(response.data)

    } catch (error) {
        console.log(error);
        return [];
    }
}

async function deleteChecklist(id,cardID) {
    try {
        const response = await axios.delete(
            `${URL}/cards/${cardID}/checklists/${id}?key=${API_KEY}&token=${TOKEN_KEY}`
        );
        return response.status === 200;
    } catch (error) {
        console.error(`Error deleting list: ${error.message}`);
        return false;
    }
}

async function fetchCheckItems(id, setCheckItems){
    try {
        const response = await axios.get(
            `${URL}/checklists/${id}/checkItems?key=${API_KEY}&token=${TOKEN_KEY}`
        );
        setCheckItems(response.data)

    } catch (error) {
        console.log(error);
        return [];
    }
}

async function deleteCheckItem(id,checkListId) {
    try {
        const response = await axios.delete(
            `${URL}/checklists/${checkListId}/checkItems/${id}?key=${API_KEY}&token=${TOKEN_KEY}`
        );
        return response.status === 200;
    } catch (error) {
        console.error(`Error deleting list: ${error.message}`);
        return false;
    }
}



async function updateCheckItemState(id, state, cardId) {
    try {
        const response = await axios.put(
            `${URL}/cards/${cardId}/checkItem/${id}?state=${state}&key=${API_KEY}&token=${TOKEN_KEY}`
        );
        console.log("Response from updating check item:", response.data);
        return response.status === 200;
    } catch (error) {
        console.error(`Error updating check item: ${error.message}`);
        return false;
    }
}


async function handleCreateCardSubmit(name,listId,setCards){
    if (name) {
        try {
            const response = await axios.post(
                `${URL}/cards?idList=${listId}&name=${name}&key=${API_KEY}&token=${TOKEN_KEY}`
            );
            setCards((prevCards) => [...prevCards, response.data]);
        } catch (error) {
            console.error("Error creating list:", error);
        }
        setPopoverOpen(false);
    }
};

async function handleCreateListSubmit(name,id,setLists){
    if (name) {
        try {
            const response = await axios.post(
                `${URL}/boards/${id}/lists?name=${name}&key=${API_KEY}&token=${TOKEN_KEY}`
            );

            
            setLists((prevLists) => [...prevLists, response.data]); 
        } catch (error) {
            console.error("Error creating list:", error);
        }
        setPopoverOpen(false); 
    }
};


export { fetchBoards, handleCreateBoard, fetchSingleBoard ,fetchLists,handleCreateList,deleteList, fetchCardsForList, deleteCard, fetchChecklists,deleteChecklist, fetchCheckItems,deleteCheckItem,updateCheckItemState,handleCreateListSubmit,handleCreateCardSubmit}
