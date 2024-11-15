const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcrypt'); 

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Database connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Mittuanish@123',
  database: 'evotin'
});

db.connect((err) => {
  if (err) throw err;
  console.log('Connected to database');
});

// Hashing password before storing
async function hashPassword(password) {
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  return hashedPassword;
}

// Signup endpoint
app.post('/signup', async (req, res) => {
  const { username, email, password, voter_id, state } = req.body;

  try {
    const hashedPassword = await hashPassword(password);

    const sql = 'INSERT INTO users (username, email, password_hash, voter_id, state) VALUES (?, ?, ?, ?, ?)';
    db.query(sql, [username, email, hashedPassword, voter_id, state], (err, result) => {
      if (err) {
        console.error('Error inserting user:', err);
        res.status(500).send('Failed to register user.');
      } else {
        res.send('Sign up successful!');
      }
    });
  } catch (error) {
    console.error('Unexpected error:', error);
    res.status(500).send('Server Error');
  }
});

// Login endpoint
app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const sql = 'SELECT * FROM users WHERE email = ?';
    db.query(sql, [email], async (err, results) => {
      if (err) {
        console.error('Error fetching user:', err);
        res.status(500).send('Server Error');
      } else if (results.length > 0) {
        const user = results[0];
        const passwordMatch = await bcrypt.compare(password, user.password_hash);

        if (passwordMatch) {
         
          console.log('User data:', { name: user.username, state: user.state }); 
          res.json({ success: true, name: user.username, state: user.state });
        } else {
          res.json({ success: false, message: 'Invalid email or password.' });
        }
      } else {
        res.json({ success: false, message: 'Invalid email or password.' });
      }
    });
  } catch (error) {
    console.error('Unexpected error:', error);
    res.status(500).send('Server Error');
  }
});


app.listen(3000, () => {
  console.log('Server running on port 3000');
});

//dash end
// app.post('/dashboard', async (req, res) => {
//   const { email, password } = req.body;

//   try {
//     const sql = 'SELECT * FROM users WHERE email = ?';
//     db.query(sql, [email], async (err, results) => {
//       if (err) {
//         console.error('Error fetching user:', err);
//         res.status(500).send('Server Error');
//       } else if (results.length > 0) {
//         const user = results[0];
//         const passwordMatch = await bcrypt.compare(password, user.password_hash);

//         if (passwordMatch) {
//           // Successful then next to return 
//           console.log('User data:', { name: user.username, state: user.state }); // Log user data
//           res.json({ success: true, name: user.username, state: user.state });
//         } else {
//           res.json({ success: false, message: 'Invalid email or password.' });
//         }
//       } else {
//         res.json({ success: false, message: 'Invalid email or password.' });
//       }
//     });
//   } catch (error) {
//     console.error('Unexpected error:', error);
//     res.status(500).send('Server Error');
//   }
// });

