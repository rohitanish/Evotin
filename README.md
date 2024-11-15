Voting Application
This project is a web-based voting application that allows users to log in, cast their votes, and store voting information on the blockchain. The application consists of a frontend for user interaction and a backend for handling authentication and blockchain transactions.

Table of Contents
Installation
Usage
Project Structure
Features
Technologies Used
Contributing
License
Installation
Clone the repository:
git clone https://github.com/yourusername/voting-app.git
cd voting-app

Install backend dependencies:
cd server
npm install

Install frontend dependencies:
cd ../client
npm install

Set up the database:
Ensure you have a MySQL database running.
Create a database and import the provided SQL schema.
Configure environment variables:
Create a .env file in the server directory and add your database credentials and other necessary configurations.
Run the backend server:
cd server
npm start

Run the frontend server:
cd ../client
npm start

Usage
Open the application:
Navigate to http://localhost:3000 in your web browser.
Log in:
Use your email and password to log in.
Vote:
Select a party and cast your vote. Your vote will be recorded on the blockchain.
Project Structure
voting-app/
├── client/                 # Frontend code
│   ├── index.html
│   ├── login.js
│   ├── dash.js
│   └── ...                 # Other frontend files
├── server/                 # Backend code
│   ├── server.js
│   ├── db.js
│   └── ...                 # Other backend files
└── README.md

Features
User Authentication: Secure login system with email and password.
Voting: Users can cast their votes, which are stored on the blockchain.
Blockchain Integration: Ensures the integrity and transparency of the voting process.
Technologies Used
Frontend:
HTML, CSS, JavaScript
Web3.js for blockchain interaction
Backend:
Node.js, Express.js
MySQL for database
bcrypt for password hashing
Blockchain:
Ethereum blockchain
Smart contracts for voting
Contributing
Contributions are welcome! Please fork the repository and submit a pull request.

License
This project is licensed under the MIT License.
