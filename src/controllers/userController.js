// const userService = require("../services/userservices");

// exports.homePage = (req, res) => {
//     res.render("homepage");
// };
// exports.registerForm = (req, res) =>
//     { res.render("register.ejs");
//     };
// exports.registerUser = (req, res) => 
//     { 
//         userService.register(req,res);
//     };
// exports.loginForm = (req, res) => {
//     res.render("login.ejs");
// };


// exports.loginUser =(req, res) => 
//     {userService.login(req,res);
// };
// exports.logoutUser = (req, res) => {
//     res.clearCookie("token");
//     res.render("homepage");
// };
// exports.login = async (req, res) => {
//     const { username, password } = req.body;
//     const user = await userService.getUserByUsername(username); // or studentService if appropriate

//     if (user && user.password === password) {
//         // Set session user with at least id and username
//         req.session.user = { id: user.id, username: user.username };
//         console.log('Session user set:', req.session.user); // Debug log
//         return res.redirect('/dashboard');
//     } else {
//         // ...existing code for failed login...
//         return res.render('login', { error: 'Invalid credentials' });
//     }
// };
// exports.adminHomePage=(req,res)=>
// {
//     res.render("adminboard.ejs");
// }
// exports.loginHomePage=(req,res)=>{
//     res.render("studentboard.ejs");
// }


const userService = require("../services/userservices");

exports.homePage = (req, res) => {
    res.render("homepage");
};

exports.registerForm = (req, res) => {
    res.render("register");
};

exports.loginForm = (req, res) => {
    res.render("login");
};

exports.registerUser = async (req, res) => {
    try {
        await userService.register(req, res);
    } catch (error) {
        console.error(error);
        res.render("register", { error: "Registration failed." });
    }
};

exports.loginUser = async (req, res) => {
    try {
        await userService.login(req, res);
    } catch (error) {
        console.error(error);
        res.render("login", { error: "Login failed." });
    }
};

exports.logoutUser = (req, res) => {
    res.clearCookie("token");
    res.redirect("/");
};

exports.adminHomePage = (req, res) => {
    res.render("adminboard");
};

exports.loginHomePage = (req, res) => {
    res.render("studentboard");
};
