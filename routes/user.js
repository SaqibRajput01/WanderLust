const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const { saveRedirectUrl } = require("../middleware.js");

const usersController = require("../Controllers/users.js");


// Routes for User Sign Up, Login, and Logout
router
    .route('/signUp')
    .get(usersController.renderSignUpForm)
    .post(wrapAsync(usersController.signUp));


router
    .route('/login')
    .get(usersController.renderLoginForm)
    .post(saveRedirectUrl, usersController.login);


router.get("/logout", usersController.logout);

module.exports = router;