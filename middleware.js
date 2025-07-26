module.exports.isLoggedIn = (req, res, next) => {
    console.log("isLoggedIn called, user:", req.user);
    if (!req.isAuthenticated()) {
        req.session.redirectUrl = req.originalUrl;
        req.flash("success", "You must be Login to Create a New Listing!");
        return res.redirect('/login');
    }
    next();
}


module.exports.saveRedirectUrl = (req, res, next) => {
    if (req.session.redirectUrl) {
        res.locals.redirectUrl = req.session.redirectUrl;
    }
    next();
}