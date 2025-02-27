import axios from "axios";
import { createContext, useState } from "react";
import toast from "react-hot-toast";

export const FlashcardContext = createContext()

export const FlashCardProvider = ({ children }) => {
    const [flashcards, setFlashcards] = useState([])

    const getAllFlashCard = async (userID) => {
        try {
            console.log("runn")
            const { data } = await axios.get(`http://localhost:8080/flashcards/${userID}`)

            setFlashcards(data.flashcards)
            console.log(data)


        } catch (error) {
            if (!error.response.data.success) {
                toast.error(error.response.data.message)
            }
        }
    }
    const updateFlashcard = async (id, isCorrect) => {
        try {

            const { data } = await axios.put(`http://localhost:8080/flashcards/${id}`, { isCorrect })
            console.log(data)


        } catch (error) {
            if (!error.response.data.success) {
                toast.error(error.response.data.message)
            }
        }
    }
    const deleteFlashcard = async (id) => {
        try {

            const { data } = await axios.delete(`http://localhost:8080/flashcards/${id}`)
            console.log(data)


        } catch (error) {
            if (!error.response.data.success) {
                toast.error(error.response.data.message)
            }
        }
    }

    return (

        <FlashcardContext.Provider value={{ flashcards, setFlashcards, getAllFlashCard, updateFlashcard, deleteFlashcard }}>

            {children}
        </FlashcardContext.Provider>
    )

}