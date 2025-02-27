import React, { useContext, useState } from 'react';
import toast from 'react-hot-toast';
import { AuthContext } from '../context/AuthContext';
import { FlashcardContext } from '../context/FlashCardContext';

function FlashCard({ flashcard, key, setIsLoading, setCurrent }) {
    const [showAnswer, setShowAnswer] = useState(false);
    const { updateFlashcard, deleteFlashcard, getAllFlashCard } = useContext(FlashcardContext)
    const { user } = useContext(AuthContext)



    const handleCorrect = async () => {
        const isCorrect = true
        console.log(key)
        await updateFlashcard(flashcard._id, isCorrect)
        setCurrent(curr => curr + 1)
    };

    const handleIncorrect = async () => {
        const isCorrect = false
        await updateFlashcard(flashcard._id, isCorrect)
    };
    const handleDelete = async () => {
        setIsLoading(true)
        await deleteFlashcard(flashcard._id)
        await getAllFlashCard(user._id)
        toast.success("Deleted")
        setIsLoading(false)
    }
    return (
        <div className="p-4 rounded-lg shadow-md mb-4 card border-1">
            <div className='flex items-center justify-between'>

                <h3 className="text-xl font-semibold mb-2 text-primary">{flashcard.question}</h3>

                <button
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                    onClick={handleDelete}
                >
                    Delete
                </button>

            </div>

            {showAnswer ? (
                <div>
                    <p className="text-gray-700 text-secondary">{flashcard.answer}</p>
                    <div className="mt-4 flex justify-around">
                        <button
                            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                            onClick={handleCorrect}
                        >
                            Got it right!
                        </button>
                        <button
                            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                            onClick={handleIncorrect}
                        >
                            Got it wrong
                        </button>
                    </div>
                </div>
            ) : (
                <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    onClick={() => setShowAnswer(true)}
                >
                    Show Answer
                </button>
            )}
        </div>
    );
}

export default FlashCard;
