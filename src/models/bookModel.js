const db = require("../config/db");

exports.insertBook = (bookData, callback) => {
    const { title, author, image, publisher, isbn, category } = bookData;

    const query = `
        INSERT INTO books (title, author, image, publisher, isbn, category)
        VALUES (?, ?, ?, ?, ?, ?)
    `;

    const values = [title, author, image, publisher, isbn, category];

    db.query(query, values, (err, result) => {
        if (err) return callback(err);
        callback(null, result);
    });
};

exports.getAllBooks = () => {
  return new Promise((resolve, reject) => {
    db.query("SELECT * FROM books", (err, results) => {
      if (err){
        return reject(err);
      } 
      else{
      resolve(results);
      };
    });
  });
};

exports.getBookById = (id) => {
  return new Promise((resolve, reject) => {
    db.query("SELECT * FROM books WHERE id = ?", [id], (err, results) => {
      if (err) return reject(err);
      resolve(results[0]);
    });
  });
};

exports.updateBook = (id, data) => {
  const { title, author, image, publisher, isbn, category } = data;
  return new Promise((resolve, reject) => {
    db.query(
      "UPDATE books SET title=?, author=?, image=?, publisher=?, isbn=?, category=? WHERE id=?",
      [title, author, image, publisher, isbn, category, id],
      (err) => {
        if (err) return reject(err);
        resolve();
      }
    );
  });
};

exports.deleteBook = (id) => {
  return new Promise((resolve, reject) => {
    db.query("DELETE FROM books WHERE id = ?", [id], (err) => {
      if (err) return reject(err);
      resolve();
    });
  });
};

exports.getAllBooks = () => {
  return new Promise((resolve, reject) => {
    db.query("SELECT * FROM books", (err, results) => {
      if (err) return reject(err);
      resolve(results);
    });
  });
};
