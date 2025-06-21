const db = require("../config/db");

exports.findUserById = (id) => {
    return new Promise((resolve, reject) => {
        const sql = "SELECT id, name, email, contact FROM users WHERE id = ?";
        db.query(sql, [id], (err, results) => {
            if (err) return reject(err);
            resolve(results[0]);
        });
    });
};

exports.updateUserById = (id, { name, email, contact }) => {
    return new Promise((resolve, reject) => {
        const sql = "UPDATE users SET name = ?, email = ?, contact = ? WHERE id = ?";
        db.query(sql, [name, email, contact, id], (err, results) => {
            if (err) return reject(err);
            resolve(results);
        });
    });
};
