const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const { listingSchema } = require("../schema.js");
const Listing = require("../models/listings.js")
const { isLoggedIn } = require("../middleware.js");


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

//Listings HomePage
router.get('/', wrapAsync(async (req, res) => {
    const allListings = await Listing.find({});
    res.render('listings/index.ejs', { allListings });
})
);


//New Listing Page
router.get('/new', isLoggedIn, (req, res) => {
    res.render('listings/new.ejs');
})

//Show Listings
router.get('/:id', wrapAsync(async (req, res) => {
    const id = req.params.id;
    const listing = await Listing.findById(id).populate('reviews');
    res.render('listings/show.ejs', { listing });
})
);

//Create Route
router.post('/', isLoggedIn, validateListing, wrapAsync(async (req, res, next) => {
    listingSchema.validate(req.body);
    const newListing = new Listing(req.body.listing);
    await newListing.save();
    req.flash("success", "New Listing Created!");
    res.redirect('/listings');
})
);

//Edit Call
router.get('/:id/edit', isLoggedIn, wrapAsync(async (req, res) => {
    const id = req.params.id;
    const listing = await Listing.findById(id);
    res.render('listings/edit.ejs', { listing });
})
);

//Update Route
router.put('/:id', isLoggedIn, validateListing, wrapAsync(async (req, res) => {
    const id = req.params.id;
    await Listing.findByIdAndUpdate(id, { ...req.body.listing });
    req.flash("success", "Listing Updated!");
    res.redirect('/listings');
})
);

//Delete Route
router.delete('/:id', isLoggedIn, wrapAsync(async (req, res) => {
    const id = req.params.id;
    await Listing.findByIdAndDelete(id);
    req.flash("success", "Listing Deleted!");
    res.redirect('/listings');
})
);

module.exports = router;