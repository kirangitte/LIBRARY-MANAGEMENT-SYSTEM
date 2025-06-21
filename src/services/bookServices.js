const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const bookModel = require("../models/bookModel");
exports.addBook = (bookData, callback) => {
    bookModel.insertBook(bookData, (err, result) => {
        if (err) return callback(err);
        callback(null, result);
    });
}; // <-- Added missing closing brace here
exports.getAllBooks = () => {
    return bookModel.getAllBooks();
};

// const db = require("../config/db");

exports.searchBooks = async (query) => {
  return new Promise((resolve, reject) => {
    const searchQuery = `%${query}%`;
    const sql = `
      SELECT * FROM books 
      WHERE title LIKE ? OR author LIKE ? OR publisher LIKE ?
      ORDER BY id ASC
    `;
    db.query(sql, [searchQuery, searchQuery, searchQuery], (err, result) => {
      if (err) reject(err);
      else resolve(result);
    });
  });
};

exports.getBookById = (id) => bookModel.getBookById(id);
exports.updateBook = (id, data) => bookModel.updateBook(id, data);
exports.deleteBook = (id) => bookModel.deleteBook(id);


//isue for book
exports.getAllBooks = () => {
    return bookModel.getAllBooks(); // Already defined properly in your `bookModel.js`
};


