const db = require("../config/db");

exports.insertIssue = (data) => {
    return new Promise((resolve, reject) => {
        const { book_id, issued_by, issue_date, return_date, status } = data;

        const sql = `
            INSERT INTO issue_details (book_id, issued_by, issue_date, return_date, status)
            VALUES (?, ?, ?, ?, ?)
        `;

        db.query(sql, [book_id, issued_by, issue_date, return_date, status], (err, result) => {
            if (err) {
                console.error("DB insert error:", err);
                return reject(err);
            }
            resolve(result);
        });
    });
};
