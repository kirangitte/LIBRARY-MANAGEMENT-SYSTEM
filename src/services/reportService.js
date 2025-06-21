const reportModel = require("../models/reportModel");

exports.getAllReports = () => reportModel.getAllReports();
exports.searchReports = (query) => reportModel.searchReports(query);
exports.getReportById = (id) => reportModel.getReportById(id);
exports.updateReport = (id, data) => reportModel.updateReport(id, data);
exports.deleteReport = (id) => reportModel.deleteReport(id);
