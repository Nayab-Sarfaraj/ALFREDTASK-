import React, { useContext, useEffect, useState } from 'react';
import FlashCard from '../components/FlashCard';
import { AuthContext } from "../context/AuthContext";
import { FlashcardContext } from "../context/FlashCardContext";

function ReviewPage() {
    const { flashcards, getAllFlashCard } = useContext(FlashcardContext)
    const [current, setCurrent] = useState(0)
    const [isLoading, setIsLoading] = useState(true)
    const { user } = useContext(AuthContext);
    console.log(user)

    const fetchData = async () => {
        setIsLoading(true)
        await getAllFlashCard(user._id)
        setIsLoading(false)
    }
    useEffect(() => {

        fetchData()

        console.log(flashcards)


    }, []);



    const moveToNext = () => {
        if (current < flashcards.length - 1) setCurrent(curr => curr + 1)
    }
    console.log(current)


    return (
        <div className="container mx-auto py-8">
            <h1 className="text-2xl font-bold mb-4">Review Flashcards</h1>

            {
                isLoading ? <div className="flex justify-center items-center h-full">
                    <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
                </div>
                    : flashcards.length > 0 ? (<>
                        <FlashCard
                            key={flashcards[current]._id}
                            flashcard={flashcards[current]}

                            setCurrent={setCurrent}

                            setIsLoading={setIsLoading}

                        />
                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded shadow-md transition duration-300 ease-in-out" onClick={moveToNext}>
                            Next
                        </button>
                    </>) : <> <h2 className="text-4xl font-extrabold mb-8">0 Flashcards Due Today</h2></>
            }

        </div >
    );
}

export default ReviewPage;
