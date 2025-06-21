const db = require("../config/db");

// Join issue_details, books, users
exports.getAllReports = () => {
    return new Promise((resolve, reject) => {
        const sql = `
            SELECT i.id, b.title AS book_name, u.name AS username, b.author, i.issue_date, i.return_date
            FROM issue_details i
            JOIN books b ON i.book_id = b.id
            JOIN users u ON i.issued_by = u.id
            ORDER BY i.id ASC
        `;
        db.query(sql, (err, results) => {
            if (err) return reject(err);
            resolve(results);
        });
    });
};

exports.searchReports = (query) => {
    return new Promise((resolve, reject) => {
        const q = `%${query}%`;
        const sql = `
            SELECT i.id, b.title AS book_name, u.name AS username, b.author, i.issue_date, i.return_date
            FROM issue_details i
            JOIN books b ON i.book_id = b.id
            JOIN users u ON i.issued_by = u.id
            WHERE b.title LIKE ? OR u.name LIKE ? OR b.author LIKE ?
            ORDER BY i.id ASC
        `;
        db.query(sql, [q, q, q], (err, results) => {
            if (err) return reject(err);
            resolve(results);
        });
    });
};

exports.getReportById = (id) => {
    return new Promise((resolve, reject) => {
        const sql = `
            SELECT i.id, i.book_id, i.issued_by, b.title AS book_name, u.name AS username, b.author, i.issue_date, i.return_date
            FROM issue_details i
            JOIN books b ON i.book_id = b.id
            JOIN users u ON i.issued_by = u.id
            WHERE i.id = ?
        `;
        db.query(sql, [id], (err, results) => {
            if (err) return reject(err);
            resolve(results[0]);
        });
    });
};

exports.updateReport = (id, data) => {
    return new Promise((resolve, reject) => {
        const { book_id, issued_by, issue_date, return_date } = data;
        const sql = `
            UPDATE issue_details SET book_id=?, issued_by=?, issue_date=?, return_date=?
            WHERE id=?
        `;
        db.query(sql, [book_id, issued_by, issue_date, return_date, id], (err) => {
            if (err) return reject(err);
            resolve();
        });
    });
};

exports.deleteReport = (id) => {
    return new Promise((resolve, reject) => {
        db.query("DELETE FROM issue_details WHERE id = ?", [id], (err) => {
            if (err) return reject(err);
            resolve();
        });
    });
};
