import React, { useContext } from 'react';

import { Link } from 'react-router-dom';
import { ThemeContext } from '../context/themeContext';
import CreateFlashcardForm from '../components/CreateFlashCardForm';
import { FlashcardContext } from '../context/FlashCardContext';

function HomePage() {
    const { toggleTheme } = useContext(ThemeContext)
    const { flashcards } = useContext(FlashcardContext)
    const noCardsDue = flashcards.length === 0;
    return (
        <div className="min-h-screen flex flex-col ">

            <div className="flex-grow flex flex-col justify-center items-center">
                {noCardsDue ? (
                    <div className="text-center">
                        <p className="text-xl">No Flashcards Due Today!</p>
                        <p className="text-sm mt-2">You're all caught up!</p>
                    </div>
                ) : (
                    <div>
                        <h2 className="text-4xl font-extrabold mb-8">{flashcards.length} Flashcards Due Today</h2>

                    </div>
                )}

                <CreateFlashcardForm />
            </div>

        </div>
    );
}

export default HomePage;
