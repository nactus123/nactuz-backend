import { addUser } from '../dbQueries/users.js';
import { encrypt } from '../functions/crypto.js';
export const registerUser = async (req, res, next) => {
  try {
    console.log('HERE');
    const { firstName, lastName, phoneNumber, password, role } = req.body;

    console.log({ password: encrypt(password) });
    console.log(req.body);
    await addUser(
      userId,
      firstName,
      lastName,
      phoneNumber,
      encrypt(password),
      role
    );
  } catch (err) {
    console.log(err.stack);
    res.status(500).json({ msg: err.message });
  }
};
