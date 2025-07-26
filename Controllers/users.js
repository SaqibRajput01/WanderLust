const User = require('../models/user.js');
const passport = require("passport");

module.exports.renderSignUpForm = (req, res) => {
    res.render("users/signup.ejs");
};

module.exports.signUp = async (req, res, next) => {
    try {
        let { username, email, password } = req.body;
        const newUser = new User({ email, username });
        const registeredUser = await User.register(newUser, password);
        req.login(registeredUser, (err) => {
            if (err) {
                return next(err);
            }
            req.flash("success", "Welcome to WanderLust!");
            res.redirect('/listings');
        })
    }
    catch (e) {
        req.flash("success", e.message);
        res.redirect("/signUp");
    }
};

module.exports.renderLoginForm = (req, res) => {
    res.render("users/login.ejs");
};

module.exports.login = (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if (err) {
            return next(err);
        }
        if (!user) {
            req.flash('success', 'Invalid username or password.');
            return res.redirect('/login');
        }
        // Log the user in (establish session)
        req.logIn(user, (err) => {
            if (err) {
                return next(err);
            }
            // Successful login, send welcome message.
            req.flash('success', `Welcome back, ${user.username}!`);
            console.log("The redirectURL of this request is: " + res.locals.redirectUrl);
            console.log("The Value  is of again this request is:" + res.locals.redirectUrl);
            res.redirect(res.locals.redirectUrl || '/listings');
        });
    })(req, res, next);
};

module.exports.logout =  (req, res, next) => {
    req.logout((err) => {
        if (err) {
            return next(err);
        }
        req.flash("success", "You are logged out!");
        res.redirect('/listings');
    });
};