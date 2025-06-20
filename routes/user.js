const express = require("express");
const router = express.Router();
const User = require("../models/user.js");
const wrapAsync = require("../utils/wrapAsync.js");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware.js");

router.get("/signUp", (req, res) => {
    res.render("users/signup.ejs");
});

router.post("/signUp", wrapAsync(async (req, res, next) => {
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
}));

router.get("/login", (req, res) => {
    res.render("users/login.ejs");
});

router.post('/login', saveRedirectUrl, (req, res, next) => {
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
            console.log("The redirectURL@@ is: " + res.locals.redirectUrl);
            let redirectURL = res.locals.redirectURL || "/listings";
            console.log("The Value  is :" + redirectURL);
            res.redirect(redirectURL);
        });
    })(req, res, next);
});

router.get("/logout", (req, res, next) => {
    req.logout((err) => {
        if (err) {
            return next(err);
        }
        req.flash("success", "You are logged out!");
        res.redirect('/listings');
    });
});

module.exports = router;