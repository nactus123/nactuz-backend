import query from './index.js';
const addUser = async (firstName, lastName, phoneNumber, role, password) => {
  try {
    const sql = `
      INSERT INTO users (first_name, last_name, phone_number, role, password)
      VALUES ($1, $2, $3, $4, $5)
    `;
    const values = [firstName, lastName, phoneNumber, role, password];

    // Execute the query with parameterized values

    const result = await query(sql, values);
    console.log({ result });
    return { statusCode: 200, message: 'User added successfully' };
  } catch (err) {
    console.error(err.stack);
    return { statusCode: 500, message: err.message };
  }
};

export { addUser };
