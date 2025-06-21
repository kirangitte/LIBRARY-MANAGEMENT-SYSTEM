const bookService = require("../services/bookServices");
const db=require("../config/db");
exports.viewBookLibary=(req,res)=>{
    res.render("adminboard.ejs");
};
exports.addNewBook=(req,res)=>{
    res.render("addbook.ejs");
};

exports.storeNewBook = (req, res) => {
    const bookData = req.body;

    bookService.addBook(bookData, (err, result) => {
        if (err) {
            console.error("Error inserting book:", err);
            return res.status(500).send("Database error.");
        }
    
        res.render("addbook", { success: true });
    });
};

exports.addNewBook = (req, res) => {
    res.render("addbook", { success: false }); 
};
// exports.viewAllUser=(req,res)=>{
//     res.render("viewuser");
// }
exports.viewAllUser = (req, res) => {
  db.query('SELECT  id,name, email, contact FROM users WHERE role = ?', ['user'], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Database error");
    }
    // Pass the users array to the EJS view:
    res.render('viewuser', { users: results });
  });
};

exports.deleteUser = (req, res) => {
  const id = req.params.id;
  db.query('DELETE FROM users WHERE id = ?', [id], (err) => {
    if (err) return res.status(500).send("Deletion error");
    res.redirect('/viewUser');
  });
};

exports.editUserForm = (req, res) => {
  const id = req.params.id;
  db.query('SELECT id, name, email, contact FROM users WHERE id = ?', [id], (err, results) => {
    if (err) return res.status(500).send("Edit fetch error");
    res.render('updateuser', { user: results[0] });
  });
};

exports.updateUser = (req, res) => {
  const id = req.params.id;
  const { name, email, contact } = req.body;
  db.query(
    'UPDATE users SET name = ?, email = ?, contact = ? WHERE id = ?',
    [name, email, contact, id],
    (err) => {
      if (err) return res.status(500).send("Update failed");
      res.redirect('/viewUser');
    }
  );
};


exports.getAllBooks = (req, res) => {
    const sql = "SELECT * FROM books";

    db.query(sql, (err, results) => {
        if (err) {
            console.error("Error fetching books:", err);
            return res.status(500).send("Server Error");
        }

        res.render("viewbook", { books: results });
    });
};

exports.searchBook = async (req, res) => {
  try {
    const { query } = req.query;
    const books = await bookService.searchBooks(query);
    res.render("viewbook", { books });
  } catch (error) {
    console.error("Search error:", error);
    res.status(500).send("Search failed");
  }
};

exports.editBookPage = async (req, res) => {
  const book = await bookService.getBookById(req.params.id);
  res.render("editbook", { book });
};

exports.updateBook = async (req, res) => {
  const bookData = req.body;
  // Ensure the image field is included in the bookData
  if (req.file) {
    bookData.image = req.file.filename;
  }
  await bookService.updateBook(req.params.id, bookData);
  res.redirect("/viewbooks");
};

exports.deleteBook = async (req, res) => {
  await bookService.deleteBook(req.params.id);
  res.redirect("/viewbooks");
};