# Evotin Blockchain based Voting Software

This project is a web application that uses various Node.js packages and integrates with a MySQL database and a Ganache blockchain for implementing blockchain functionalities.

## Table of Contents

- Installation
- Usage
- Dependencies
- Features
- License

## Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/roiitanish86/evotin
    cd your-repo
    ```

2. Install the dependencies:
    ```bash
    npm install
    ```

3. Set up your MySQL database and update the configuration in the project.
    Start the server using npm start to connect the database.


4. Start Ganache and ensure it is running on `http://localhost:7545`.

5. Start the application:
    ```bash
    npm start
    ```

## Usage

- The application provides a web interface for users to interact with the blockchain and the MySQL database.
- Users can vote in elections, and the votes are recorded on the blockchain.
- The application also displays current, upcoming, and past elections.

## Dependencies

This project uses the following Node.js packages:

- `bcrypt@5.1.1`: For hashing passwords.
- `body-parser@1.20.3`: For parsing incoming request bodies.
- `cors@2.8.5`: For enabling Cross-Origin Resource Sharing.
- `express-session@1.18.1`: For managing user sessions.
- `express@4.21.1`: For creating the web server.
- `fs@0.0.1-security`: For interacting with the file system.
- `mysql@2.18.1`: For connecting to the MySQL database.
- `web3@4.15.0`: For interacting with the Ethereum blockchain.

## Features

- **User Authentication**: Secure user authentication using `bcrypt` for password hashing.
- **Database Integration**: Connects to a MySQL database to store user and election data.
- **Blockchain Integration**: Uses Ganache to simulate a local blockchain for recording votes.
- **RESTful API**: Provides a RESTful API for interacting with the application.
- **Responsive Design**: A user-friendly interface that works on both desktop and mobile devices.

## License

This project is licensed under the MIT License. See the LICENSE file for details.
