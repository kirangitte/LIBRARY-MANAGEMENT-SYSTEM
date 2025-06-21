const express = require("express");
const router = express.Router();
const reportController = require("../controllers/reportController");

router.get("/reports", reportController.showReports);
router.get("/searchReports", reportController.searchReports);
router.get("/updateReport/:id", reportController.showUpdateForm);
router.post("/updateReport/:id", reportController.updateReport);
router.get("/deleteReport/:id", reportController.deleteReport);

module.exports = router;
