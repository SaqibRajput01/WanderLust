const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const { listingSchema } = require("../schema.js");
const { isLoggedIn } = require("../middleware.js");
const multer = require("multer");
const upload = multer({ dest: 'uploads/' });
const listingController = require("../Controllers/listings.js");


//Middlewares

const validateListing = (req, res, next) => {
    let { error } = listingSchema.validate(req.body);
    console.log(error);
    if (error) {
        let errMsg = error.details.map((el) => el.message).join(',');
        throw new ExpressError(errMsg, 400);
    }
    else {
        next();
    }
};


//Routes

//Listings HomePage & Render Create Listing
router
    .route('/')
    .get(wrapAsync(listingController.index))
    // .post(isLoggedIn, validateListing, wrapAsync(listingController.createListing));
    .post(upload.single("listing[image][url]"), (req, res) => {
        console.log(req.file); // req.file contains the uploaded file information
        res.send(req.file); // You can send a response or redirect as needed
    })


//New Listing Page
router.get('/new', isLoggedIn, listingController.renderNewPage);


//Show Listing & Update/Delete Listing
router
    .route('/:id')
    .get(wrapAsync(listingController.showListing))
    .put(isLoggedIn, validateListing, wrapAsync(listingController.updateListing))
    .delete(isLoggedIn, wrapAsync(listingController.destroyListing));


//Edit Call
router.get('/:id/edit', isLoggedIn, wrapAsync(listingController.renderEditForm));


module.exports = router;