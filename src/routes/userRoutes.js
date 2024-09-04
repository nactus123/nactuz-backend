import express from 'express';
import { registerUser, updateUserProfile, loginUser } from '../controllers/usersController.js';

const router = express.Router();

// POST /registerUser route
router.post('/registerUser', registerUser);

// POST /updateProfile route
router.post('/updateProfile', updateUserProfile);

// POST /login route
router.post('/login', loginUser);

export default router;
