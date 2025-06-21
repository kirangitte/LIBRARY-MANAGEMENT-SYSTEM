const db = require("../config/db");

exports.createUser = (user, callback) => {
    const sql = `INSERT INTO users (name, email, contact, role, password) VALUES (?, ?, ?, ?, ?)`;
    db.query(sql, [user.name, user.email, user.contact, user.role, user.password], callback);
};

exports.findUserByEmail = (email, callback) => {
    const sql = `SELECT * FROM users WHERE email = ?`;
    db.query(sql, [email], callback);
};
exports.deleteUserById = (id, cb) => {
  db.query('DELETE FROM users WHERE id = ?', [id], cb);
};

exports.getUserById = (id, cb) => {
  db.query('SELECT * FROM users WHERE id = ?', [id], (err, result) => {
    cb(err, result[0]);
  });
};

exports.updateUserById = (id, updateFields, callback) => {
    // Build SET clause dynamically
    const fields = [];
    const values = [];
    for (const key in updateFields) {
        fields.push(`${key} = ?`);
        values.push(updateFields[key]);
    }
    values.push(id);
    const sql = `UPDATE users SET ${fields.join(', ')} WHERE id = ?`;
    // Assuming you have a db connection object
    db.query(sql, values, callback);
};