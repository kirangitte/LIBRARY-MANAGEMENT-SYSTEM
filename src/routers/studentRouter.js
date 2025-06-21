const express = require('express');
const router = express.Router();
const studentController = require('../controllers/studentController');

router.get('/viewProfile', studentController.viewProfile);
router.post('/updateProfile', studentController.updateProfile);
router.get("/books",studentController.bookAdd);



// issue 

router.get('/books', studentController.showBookIssueForm);
router.post('/books', studentController.issueBook);
// router.get("/books",studentController.bookAdd);
router.get("/issueDetails", studentController.bookIssuedStud);
router.get("/updateIssue/:id", studentController.showUpdateIssueForm);
router.post("/updateIssue/:id", studentController.updateIssue);
router.get("/deleteIssue/:id", studentController.deleteIssue);
router.get('/book', studentController.showAllBooks);
router.get('/book/:id', studentController.showSingleBook);
router.post('/book/:id/issue', studentController.issueOrUpdateBook);
module.exports = router;