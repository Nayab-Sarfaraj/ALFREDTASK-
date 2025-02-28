ALFREDTASK

It is a flashcard app designed to help you retain knowledge long-term using the scientifically proven Leitner System (spaced repetition). Instead of cramming, this app schedules flashcards for review at optimal intervals, ensuring you spend time on what you actually need to learn. Built with the MERN stack (MongoDB, Express, React, Node.js), it’s a minimalist, distraction-free tool for students, professionals, or anyone chasing lifelong learning.





## Key Features

*   **Flashcard Creation:** Easily create new flashcards with questions and answers.
*   **Leitner System Implementation:** Flashcards are organized into boxes, and their review schedule is determined by their current box level and the spaced repetition algorithm.
*   **Spaced Repetition:** Flashcards due for review are presented based on their next review date, optimizing learning and long-term retention.
*   **Progress Tracking:** Users can track their progress, seeing the number of flashcards due for review and their overall progress through the system.
*   **Simple and Clean UI:** The application is designed with a focus on simplicity and usability, minimizing distractions and promoting effective learning.
*   **Light/Dark Mode:** (Optional) Enhances user experience with a toggle for light and dark modes.

## ⚙️ Application Workflow: How Leitner Flashcards Works

This section explains how the Leitner System is implemented within the Flashcard Master application.

1. **Creating Flashcards:**

    *   Users create flashcards with a question and answer.
    *   Each new flashcard is automatically assigned to Box 1.
    *   The flashcard's `question`, `answer`, initial `box` (Box 1), and a `nextReview` are saved in MongoDB.

2. **The Leitner Box System:**

    *   The core of the app is the Leitner System's box-based approach.
    *   There are 5 boxes:
        *   Box 1: Review Daily
        *   Box 2: Review every 3 days
        *   Box 3: Review every week
        *   Box 4: Review every two weeks
        *   Box 5: Review every month

3.  **Reviewing Flashcards:**

    *   The app fetches flashcards from the database based on their `nextReview`.
    *   Users can toggle the "Show Answer" button.
    *   After revealing the answer, the user indicates if they answered correctly.

4.  **Answering Correctly (Advancing Flashcards):**

    *   If correct, the user clicks the "Got it Right!" button.
    *   This triggers a PUT request to `/flashcards/:id`.
    *   The system then:
        *   Increments the `box` variable.
        *   Updates the `nextReview` to a future review time, according to the box's assigned time period.
        *   Persists the changes in MongoDB.

5.  **Answering Incorrectly (Returning Flashcards to Box 1):**

    *   If incorrect, the user clicks the "Got it Wrong!" button.
    *   This also triggers a PUT request to `/flashcards/:id`.
    *   The system then:
        *   Resets the `box` to 1.
        *   Sets the `nextReview` to tomorrow, so the flashcard is presented for daily review.

6.  **Progress and Spaced Repetition:**

    *   The backend only shows flashcards that have a `nextReview` which is behind the present date.
    *   The user can see metrics on how many flashcards have a `nextReview` due today for review.



## Technologies Used

*   **Frontend:**
    *   React.js
    *   React Hooks (useState, useEffect)
    *   Axios (for API communication)
    *   Tailwind CSS for styling
*   **Backend:**
    *   Node.js
    *   Express.js
    *   MongoDB (database)
    *   Mongoose (ODM for MongoDB)


## API Endpoints

*   `POST /flashcards`: Add a new flashcard.
*   `GET /flashcards/userID`: Get all flashcards.
*   `PUT /flashcards/:id`: Update a flashcard (move to the next level if answered correctly).
*   `DELETE /flashcards/:id`: Delete a flashcard.

## Leitner System Logic

*   Flashcards start in Box 1.
*   If answered correctly, they move to the next box.
*   If answered incorrectly, they go back to Box 1.
*   Higher boxes have longer review intervals.
*   Flashcard level (box number), question, answer, and next review date are stored in MongoDB.

## Setup Instructions

1.  **Clone the repository:** `git clone https://github.com/Nayab-Sarfaraj/ALFREDTASK-`
2.  **Install dependencies:**
    *   Frontend: `cd client && npm install`
    *   Backend: `cd server && npm install`
3.  **Configure MongoDB:** Ensure MongoDB is running and update the connection string in the backend configuration.
4.  **Run the application:**
    *   Frontend: `cd client && npm start`
    *   Backend: `cd server && npm start`
5.  **Access the application:** Open your browser and navigate to the frontend URL (usually `http://localhost:3000`).







