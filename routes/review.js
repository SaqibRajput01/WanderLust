const express = require("express");
const router = express.Router({ mergeParams: true });
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const Review = require("../models/review.js")
const { reviewSchema } = require("../schema.js");
const Listing = require("../models/listings.js");
const { isLoggedIn } = require("../middleware.js");

const reviewsController = require("../Controllers/reviews.js");


//Validation Middleware


const validateReview = (req, res, next) => {
    let { error } = reviewSchema.validate(req.body);
    console.log(error);
    if (error) {
        let errMsg = error.details.map((el) => el.message).join(',');
        throw new ExpressError(errMsg, 400);
    }
    else {
        next();
    }
};



//Reviews
//Review Post Route
router.post('/', isLoggedIn, validateReview, wrapAsync(reviewsController.createReview));


//Review Delete Route
router.delete('/:reviewId', isLoggedIn, wrapAsync(reviewsController.destroyReview));

module.exports = router;