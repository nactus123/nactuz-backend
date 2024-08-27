import query from './index.js';
const addUser = async (phoneNumber, role, password) => {
  try {
    let sql = `INSERT INTO users ( phone_number, role, password, is_active)
    VALUES ($1, $2, $3, $4)`;
    const values = [phoneNumber, role, password, false];
    if (role === 'teacher') {
      sql = `INSERT INTO users ( phone_number, role, password, is_active,kyc_verified)
    VALUES ($1, $2, $3, $4,$5)`;
      values.push(false);
    }
    // // Execute the query with parameterized values

    const result = await query(sql, values);
    console.log({ err: result.error });
    // if (result.) throw new Error(result);
    return {
      statusCode: 200,
      message: 'User added successfully',
      kycVerified: false
    };
  } catch (err) {
    console.error(err.stack);
    throw new Error(err);
  }
};

const updateProfile = async (data, phoneNumber) => {
  try {
    console.log({ data });
    const keys = Object.keys(data).filter(
      (key) => data[key] && key !== phoneNumber
    );
    console.log(keys);
    const values = keys.map((key) => data[key]);
    console.log({ values });
    if (keys.length === 0) {
      throw new Error('No valid fields provided for update.');
    }

    // Start with the base query
    let sql = `UPDATE users SET `;

    // Dynamically add the keys and placeholders
    const setClause = keys
      .map((key, index) => `${key} = $${index + 1}`)
      .join(', ');

    // Add WHERE clause or any other condition (assuming userId is used to identify the record)
    sql += `${setClause} WHERE phone_number = $${keys.length + 1}`;
    values.push(phoneNumber);
    console.log({ sql });
    // Add userId to the values array
    await query(sql, values);
    sql = `
      SELECT kyc_verified,role FROM users WHERE phone_number=
      $1
    `;
    const result = await query(sql, [phoneNumber]);
    const { role, kyc_verified: kycVerified } = { ...result.rows[0] };
    return { role, kycVerified };
  } catch (err) {
    console.log(err.stack);
    throw new Error(err);
  }
};
const signInUser = async (phoneNumber) => {
  try {
    const sql = `
      SELECT password,role FROM users WHERE phone_number=
      $1
    `;
    const values = [phoneNumber];

    // Execute the query with parameterized values
    const response = await query(sql, values);
    const { password: dbPassword, role } = { ...response.rows[0] };
    console.log({ dbPassword, role });
    return { dbPassword, role };
  } catch (err) {
    console.log(err.stack);
    throw new Error(err);
  }
};

export { addUser, signInUser, updateProfile };
