const studentServices=require("../services/studentServices");
const bookService = require("../services/bookServices");

const userService = require('../services/userservices');
const issueServices=require("../services/issueServices");
const db=require("../config/db");
// exports.viewStudProfile=(req,res)=>{
//     res.render("profile.ejs");
// }
exports.viewProfile = async (req, res) => {
    try {
        const sessionUser = req.session.user;
        console.log('Session user in viewProfile:', sessionUser); // Debug log
        if (!sessionUser || !sessionUser.id) {
            return res.redirect('/login');
        }
        const user = await studentServices.getProfileById(sessionUser.id);
        if (!user) {
            return res.status(404).send('User not found');
        }
        res.render('profile', { user });
    } catch (err) {
        console.error('View Profile Error:', err);
        res.status(500).send('Server Error');
    }
};

exports.login = async (req, res) => {
    // ...existing code for fetching user from DB...
    const { username, password } = req.body;
    const user = await studentService.getUserByUsername(username);
    if (user && user.password === password) {
        // Set session user with at least id and username
        req.session.user = { id: user.id, username: user.username };
        return res.redirect('/dashboard');
    } else {
        // ...existing code for failed login...
        return res.render('login', { error: 'Invalid credentials' });
    }
};

exports.updateProfile = async (req, res) => {
    try {
        const { id, name, email, contact } = req.body;
        // Update user in DB
        await userService.updateUserById(id, { name, email, contact });
        // Update session user info if needed
        if (req.session.user) {
            req.session.user.username = name;
        }
        res.redirect('/viewProfile');
    } catch (err) {
        console.error('Update Profile Error:', err);
        res.status(500).send('Server Error');
    }
};
exports.bookAdd=(req,res)=>{
    res.render("userbook.ejs");
};


//isseu details for book
exports.showBookIssueForm = async (req, res) => {
    try {
        const books = await bookService.getAllBooks(); // to populate dropdown
        res.render("userbook", { books, success: req.query.success }); // Pass success flag
    } catch (err) {
        console.error("Book fetch error:", err);
        res.status(500).send("Server Error");
    }
};


exports.issueBook = async (req, res) => {
    try {
        const user = req.session.user;
        if (!user || !user.id) {
            return res.redirect('/login');
        }

        const { book_id, issue_date, return_date, status } = req.body;

        await issueServices.issueBook({
            book_id,
            issued_by: user.id,
            issue_date,
            return_date,
            status
        });

        res.redirect("/books?success=true"); // Redirect with success flag
    } catch (err) {
        console.error("Failed to issue book:", err);
        res.status(500).send("Failed to issue book");
    }
};
exports.bookAdd = (req, res) => {
    res.render("userbook.ejs");
};

exports.bookAdd = async (req, res) => {
    try {
        const books = await bookService.getAllBooks();
        res.render("userbook", { books }); // ✅ pass books to EJS
    } catch (err) {
        console.error("Error loading books:", err);
        res.status(500).send("Failed to load books");
    }
};


// const bookService = require('../services/bookServices'); // ✅ Make sure this is imported
// const issueService = require('../services/issueService'); // ✅ New service layer

exports.bookIssuedStud = async (req, res) => {
    try {
        const user = req.session.user;
        if (!user || !user.id) {
            return res.redirect('/login');
        }
        const sql = `
            SELECT 
                i.id AS issue_id,
                b.title AS book_title,
                b.author AS book_author,
                i.issue_date,
                i.return_date,
                i.status
            FROM issue_details i
            JOIN books b ON i.book_id = b.id
            WHERE i.issued_by = ?
            ORDER BY i.id ASC
        `;
        db.query(sql, [user.id], (err, results) => {
            if (err) {
                console.error("Error fetching issued books:", err);
                return res.status(500).send("Server Error");
            }
            res.render("issuedetails", { issuedBooks: results });
        });
    } catch (err) {
        console.error("Error in bookIssuedStud:", err);
        res.status(500).send("Server Error");
    }
};

// Show update form for issued book
exports.showUpdateIssueForm = async (req, res) => {
    const issueId = req.params.id;
    // Fetch issue record and all books for dropdown
    db.query(
        `SELECT i.*, b.title FROM issue_details i JOIN books b ON i.book_id = b.id WHERE i.id = ?`,
        [issueId],
        (err, results) => {
            if (err || results.length === 0) return res.status(404).send("Issue not found");
            db.query("SELECT id, title FROM books", (err2, books) => {
                if (err2) return res.status(500).send("Books fetch error");
                res.render("updateissue", { issue: results[0], books });
            });
        }
    );
};

// Handle update POST
exports.updateIssue = (req, res) => {
    const issueId = req.params.id;
    const { book_id, issue_date, return_date } = req.body;
    db.query(
        "UPDATE issue_details SET book_id=?, issue_date=?, return_date=? WHERE id=?",
        [book_id, issue_date, return_date, issueId],
        (err) => {
            if (err) return res.status(500).send("Update failed");
            res.redirect("/issueDetails");
        }
    );
};

// Handle delete
exports.deleteIssue = (req, res) => {
    const issueId = req.params.id;
    db.query("DELETE FROM issue_details WHERE id = ?", [issueId], (err) => {
        if (err) return res.status(500).send("Delete failed");
        res.redirect("/issueDetails");
    });
};

// Show all books as cards (for /book)
exports.showAllBooks = async (req, res) => {
    try {
        const bookService = require("../services/bookServices");
        const books = await bookService.getAllBooks();
        res.render("books", { books });
    } catch (err) {
        res.status(500).send("Failed to load books");
    }
};

exports.showSingleBook = async (req, res) => {
    try {
        const bookService = require("../services/bookServices");
        const db = require("../config/db");
        const book = await bookService.getBookById(req.params.id);
        if (!book) return res.status(404).send("Book not found");
        // Fetch the user's issue record for this book
        const userId = req.session.user && req.session.user.id;
        let issue = null;
        if (userId) {
            const [rows] = await db.promise().query(
                "SELECT * FROM issue_details WHERE book_id = ? AND issued_by = ? LIMIT 1",
                [book.id, userId]
            );
            issue = rows[0];
        }
        res.render("book", { book, issue });
    } catch (err) {
        res.status(500).send("Failed to load book");
    }
};

exports.issueOrUpdateBook = async (req, res) => {
    try {
        const db = require("../config/db");
        const userId = req.session.user && req.session.user.id;
        const bookId = req.params.id;
        const { issue_date, return_date, status } = req.body;
        // Check if an issue record exists
        const [rows] = await db.promise().query(
            "SELECT id FROM issue_details WHERE book_id = ? AND issued_by = ? LIMIT 1",
            [bookId, userId]
        );
        if (rows.length > 0) {
            // Update existing issue record
            await db.promise().query(
                "UPDATE issue_details SET issue_date = ?, return_date = ?, status = ? WHERE book_id = ? AND issued_by = ?",
                [issue_date, return_date, status, bookId, userId]
            );
        } else {
            // Insert new issue record
            await db.promise().query(
                "INSERT INTO issue_details (book_id, issued_by, issue_date, return_date, status) VALUES (?, ?, ?, ?, ?)",
                [bookId, userId, issue_date, return_date, status]
            );
        }
        res.redirect(`/book/${bookId}`);
    } catch (err) {
        res.status(500).send("Failed to save issue record");
    }
};


