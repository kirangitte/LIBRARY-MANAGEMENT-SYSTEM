const reportService = require("../services/reportService");

exports.showReports = async (req, res) => {
    try {
        const reports = await reportService.getAllReports();
        res.render("reports", { reports });
    } catch (err) {
        res.status(500).send("Server Error");
    }
};

exports.searchReports = async (req, res) => {
    try {
        const { query } = req.query;
        const reports = await reportService.searchReports(query);
        res.render("reports", { reports });
    } catch (err) {
        res.status(500).send("Search failed");
    }
};

exports.showUpdateForm = async (req, res) => {
    try {
        const report = await reportService.getReportById(req.params.id);
        res.render("updatereport", { report });
    } catch (err) {
        res.status(500).send("Not found");
    }
};

exports.updateReport = async (req, res) => {
    try {
        await reportService.updateReport(req.params.id, req.body);
        res.redirect("/reports");
    } catch (err) {
        res.status(500).send("Update failed");
    }
};

exports.deleteReport = async (req, res) => {
    try {
        await reportService.deleteReport(req.params.id);
        res.redirect("/reports");
    } catch (err) {
        res.status(500).send("Delete failed");
    }
};
