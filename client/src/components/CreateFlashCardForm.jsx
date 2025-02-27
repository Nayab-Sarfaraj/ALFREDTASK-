import React, { useContext, useState } from 'react';
import axios from 'axios';
import toast from "react-hot-toast"
import { AuthContext } from '../context/AuthContext';
import { FlashcardContext } from '../context/FlashCardContext';
function CreateFlashcardForm() {
    const [question, setQuestion] = useState('');
    const [answer, setAnswer] = useState('');
    const { user } = useContext(AuthContext);
    const { getAllFlashCard } = useContext(FlashcardContext)


    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!question || !answer) {
            toast.error("All fields are required")
            return;
        }

        try {
            const { data } = await axios.post('http://localhost:8080/flashcards', { question, answer, user: user._id });
            console.log('Flashcard created:', data);



            if (data.success) {
                toast.success("Flash card created")
                setQuestion('');
                setAnswer('');
            }

            getAllFlashCard(user._id)

        } catch (err) {
            if (!err.response?.data.success) toast.error(err.response.data.message)
        }
    };

    return (
        <div className="p-4 rounded-lg shadow-2xl border-1 md:w-96 w-auto">
            <h2 className="text-xl font-semibold mb-4">Create New Flashcard</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label htmlFor="question" className="block text-sm font-medium text-gray-700">
                        Question:
                    </label>
                    <input
                        type="text"
                        id="question"
                        className="mt-1 p-2 w-full border rounded-md shadow-sm "
                        value={question}
                        onChange={(e) => setQuestion(e.target.value)}
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="answer" className="block text-sm font-medium text-gray-700">
                        Answer:
                    </label>
                    <textarea
                        id="answer"
                        className="mt-1 p-2 w-full border rounded-md shadow-sm resize-none "
                        value={answer}
                        onChange={(e) => setAnswer(e.target.value)}
                        rows="3" // Make it a textarea
                    ></textarea>
                </div>
                <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                    Create Flashcard
                </button>
            </form>
        </div>
    );
}

export default CreateFlashcardForm;
