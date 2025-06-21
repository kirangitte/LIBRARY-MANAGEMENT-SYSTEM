const studentModel = require("../models/studentModel");

exports.getProfileById = async (id) => {
    return await studentModel.findUserById(id);
};

exports.updateProfileById = async (id, data) => {
    return await studentModel.updateUserById(id, data);
};
