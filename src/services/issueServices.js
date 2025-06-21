const issueModel = require("../models/issueModel");

exports.addIssue = (data) => {
    return new Promise((resolve, reject) => {
        issueModel.insertIssue(data, (err, result) => {
            if (err) return reject(err);
            resolve(result);
        });
    });
};



exports.issueBook = async (data) => {
    return await issueModel.insertIssue(data);
};
