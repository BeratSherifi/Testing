# Word Guess Game

## Project Overview

The Word Guess Game is an interactive and fun web application where users can guess a word by selecting letters. The game includes different difficulty levels, a timer, and hints to help users guess the word. The application also supports user registration and login functionalities to enhance the user experience.

## Technologies Used

- **Frontend:**
  - React
  - CSS
  - Cypress (for end-to-end testing)

- **Backend:**
  - Node.js
  - Express.js
  - SQLite (for user data storage)

## Features

- User Registration and Login
- Difficulty Levels (Easy, Medium, Hard)
- Timer for each game session
- Hint functionality
- Letter removal feature
- Score tracking
- Game restart option
- Logout functionality

## Setup Instructions

### Prerequisites

- Node.js and npm installed
- Git installed
- SQLite installed

### Backend Setup

1. **Clone the Repository:**

    ```sh
    git clone https://github.com/BeratSherifi/Testing.git
    cd your-repo/backend
    ```

2. **Install Dependencies:**

    ```sh
    npm install
    ```

3. **Run the Backend Server:**

    ```sh
    node src/index.js
    ```

   The backend server will start on `http://localhost:5000`.

### Frontend Setup

1. **Navigate to Frontend Directory:**

    ```sh
    cd ../frontend
    ```

2. **Install Dependencies:**

    ```sh
    npm install
    ```

3. **Run the Frontend Application:**

    ```sh
    npm start
    ```

   The frontend application will start on `http://localhost:3000`.

### Cypress Testing Setup

1. **Navigate to Cypress Directory:**

    ```sh
    cd ../cypress
    ```

2. **Run Cypress Tests:**

    ```sh
    npx cypress open
    ```

    This command will open the Cypress Test Runner. You can then run the tests defined in the `cypress/e2e/word_guess_game_spec.cy.js` file.

## Running the Project

1. **Start the Backend Server:**

    Ensure that the backend server is running on `http://localhost:5000`.

2. **Start the Frontend Application:**

    Make sure the frontend application is running on `http://localhost:3000`.

3. **Run Cypress Tests:**

    Open Cypress and run the test cases to ensure everything is working correctly.

## Additional Information

- The project uses a SQLite database to store user information. The database file is created automatically when the backend server runs for the first time.
- Ensure that both backend and frontend servers are running simultaneously to allow full functionality of the application.
- Cypress tests include user registration, login, game functionalities, and navigation checks to ensure a robust and error-free application.

## Contributing

Feel free to submit issues and pull requests if you find any bugs or have suggestions for improvements.

