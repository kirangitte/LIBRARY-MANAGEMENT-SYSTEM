const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const userModel = require("../models/usermodel");


exports.register = async (req, res) => {
    const { name, email, contact, role, password } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = { name, email, contact, role, password: hashedPassword };

        userModel.createUser(user, (err, result) => {
            if (err) return res.render("register.ejs", { message: "Error registering user!" });
            res.render("register.ejs", { message: "User registered successfully!" });
        });
    } catch (error) {
        res.render("register.ejs", { message: "Server error!" });
    }
};

exports.login = (req, res) => {
    const { email, password, role } = req.body;

    userModel.findUserByEmail(email, async (err, results) => {
        if (err || results.length === 0) {
            return res.status(401).send("Invalid credentials");
        }

        const user = results[0];
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch || user.role !== role) {
            return res.status(401).send("Invalid credentials or role mismatch");
        }

        // Set session user for session-based authentication
        req.session.user = { id: user.id, username: user.name, role: user.role };
        console.log('Session user set:', req.session.user);

        const token = jwt.sign(
            { id: user.id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );

        res.cookie("token", token, {
            httpOnly: true,
            maxAge: 3600000 // 1 hour
        });

        if (role === "admin") {
            res.render("adminboard.ejs");
        } else {
            res.render("studentboard.ejs"); 
        }
    });
};
exports.deleteUserById = userModel.deleteUserById;
exports.getUserById = userModel.getUserById;
exports.updateUserById = (id, updateFields) => {
    return new Promise((resolve, reject) => {
        userModel.updateUserById(id, updateFields, (err, result) => {
            if (err) return reject(err);
            resolve(result);
        });
    });
};