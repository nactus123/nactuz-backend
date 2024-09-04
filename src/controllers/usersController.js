import { addUser, signInUser, updateProfile } from '../dbQueries/userQueries.js';
import { encrypt, decrypt } from '../functions/crypto.js';
import { INVALID_PASSWORD } from '../functions/error.js';

// Controller to handle user registration
export const registerUser = async (req, res, next) => {
  try {
    const { phoneNumber, password, role } = req.body;
    const encryptedPassword = encrypt(password);

    // Try adding the user
    const { kycVerified } = await addUser(phoneNumber, role, encryptedPassword);

    // Respond with success if the user was added
    res.status(201).json({
      msg: 'User registered successfully',
      role,
      isActive: false,
      kycVerified,
    });
  } catch (err) {
    if (err.message === 'User already exists with this phone number') {
      // Handle user already exists error
      return res.status(409).json({ msg: err.message });
    }
    // Handle other errors
    res.status(500).json({ msg: 'Unable to register user', error: err.message });
  }
};

// Controller to handle profile update
export const updateUserProfile = async (req, res, next) => {
  try {
    const { phoneNumber, firstName, lastName, password } = req.body;

    const updateData = {
      first_name: firstName,
      last_name: lastName,
      password: password ? encrypt(password) : null,
      is_active: true,
    };

    // Update user profile in the database
    const { role, kycVerified } = await updateProfile(updateData, phoneNumber);

    // Prepare response body
    const body = kycVerified !== null ? { role, isActive: false, kycVerified } : { role, isActive: false };

    // Send success response
    res.status(201).json({
      msg: 'User Profile Updated successfully',
      ...body,
    });
  } catch (err) {
    console.error('Error occurred during profile update:', err.stack);
    res.status(500).json({ msg: 'Unable to update profile', error: err.message });
  }
};

// Controller to handle user login
export const loginUser = async (req, res, next) => {
  try {
    const { password, phoneNumber } = req.body;

    // Fetch user data from the database
    const { dbPassword, role, isActive, kycVerified } = await signInUser(phoneNumber);

    // Validate password
    if (password !== decrypt(dbPassword)) {
      throw new Error(INVALID_PASSWORD);
    }

    // Prepare response body
    const body = kycVerified !== null ? { role, isActive, kycVerified } : { role, isActive };

    // Send success response
    res.status(200).json({ msg: 'Login Successful', ...body });
  } catch (err) {
    console.error('Error occurred during login:', err.stack);

    // Handle specific error messages
    if (err.message.includes(INVALID_PASSWORD)) {
      res.status(403).json({ msg: INVALID_PASSWORD });
    } else {
      res.status(500).json({ msg: 'Unable to login', error: err.message });
    }
  }
};
