import express from 'express';
import { addUser, signInUser, updateProfile } from '../dbQueries/users.js';
import { decrypt, encrypt } from '../functions/crypto.js'; // Adjust path as needed
import { INVALID_PASSWORD } from '../functions/error.js';

const router = express.Router();

// POST /register route
router.post('/registerUser', async (req, res) => {
  try {
    console.log('Received registration request');
    const { phoneNumber, password, role } = req.body;
    console.log(req.body);

    // Add the user to the database
    const { kycVerified } = await addUser(phoneNumber, role, encrypt(password));

    // Respond with a success message
    res.status(201).json({
      msg: 'User registered successfully',
      role,
      isActive: false,
      kycVerified
    });
  } catch (err) {
    console.error('Error occurred:', err.stack); // Log the error stack trace for debugging
    res
      .status(500)
      .json({ msg: 'Unable to register user', error: err.message });
  }
});
router.post('/updateProfile', async (req, res) => {
  try {
    console.log('Received update profile request');
    const { phoneNumber, firstName, lastName, password } = req.body;

    const { kyc_verified: kycVerified } = await updateProfile(
      {
        first_name: firstName,
        last_name: lastName,
        password: password ? encrypt(password) : null,
        is_active: true
      },
      phoneNumber
    );

    res.status(201).json({
      msg: 'User Profile Updated successfully',
      isActive: false,
      kycVerified
    });
  } catch (err) {
    console.error('Error occurred:', err.stack); // Log the error stack trace for debugging
    res
      .status(500)
      .json({ msg: 'Unable to update profile', error: err.message });
  }
});

router.post('/login', async (req, res) => {
  try {
    const {
      body: { password, phoneNumber }
    } = req;
    const { dbPassword, role } = await signInUser(phoneNumber, password);
    if (password !== decrypt(dbPassword)) throw new Error(INVALID_PASSWORD);
    res.status(201).json({ msg: 'Login Successful', role });
  } catch (err) {
    console.log(err.stack);
    res
      .status(500)
      .json({ msg: 'Unable to update profile', error: err.message });
  }
});
export default router;
