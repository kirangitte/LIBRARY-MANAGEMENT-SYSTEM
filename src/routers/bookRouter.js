const express = require("express");
const router = express.Router();
const bookController = require("../controllers/bookController");
router.get("/viewLibary",bookController.viewBookLibary);
router.get("/addBook",bookController.addNewBook);
router.post("/addBook", bookController.storeNewBook);
router.get("/viewUser",bookController.viewAllUser);
router.get("/delete/:id", bookController.deleteUser);
router.get("/edit/:id", bookController.editUserForm);
router.post("/update/:id", bookController.updateUser);
// router.get("/viewBook",bookController.viewAllBooks);

router.get("/viewbooks", bookController.getAllBooks);
router.get('/searchbook', bookController.searchBook);
router.get("/editbook/:id", bookController.editBookPage);
router.post("/updatebook/:id", bookController.updateBook);
router.get("/deletebook/:id", bookController.deleteBook);
module.exports=router;