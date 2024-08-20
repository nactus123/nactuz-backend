import express from 'express';
import { addUser } from '../dbQueries/users.js';
import { encrypt } from '../functions/crypto.js'; // Adjust path as needed

const router = express.Router();

// POST /register route
router.post('/registerUser', async (req, res) => {
  try {
    console.log('Received registration request');
    const { firstName, lastName, phoneNumber, password, role } = req.body;
    console.log(req.body);

    console.log({ pass: encrypt(password) });
    // Add the user to the database
    await addUser(firstName, lastName, phoneNumber, role, encrypt(password));

    // Respond with a success message
    res.status(201).json({ msg: 'User registered successfully' });
  } catch (err) {
    console.error('Error occurred:', err.stack); // Log the error stack trace for debugging
    res.status(500).json({ msg: 'Internal Server Error', error: err.message });
  }
});

export default router;
