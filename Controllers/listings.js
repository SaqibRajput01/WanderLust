const Listing = require('../models/listings.js');

module.exports.index = async (req, res) => {
    const allListings = await Listing.find({});
    res.render('listings/index.ejs', { allListings });
};

module.exports.renderNewPage = (req, res) => {
    res.render('listings/new.ejs');
}; 

module.exports.showListing = async (req, res) => {
    const id = req.params.id;
    const listing = await Listing.findById(id).populate('reviews').populate('owner');
    console.log(listing);
    res.render('listings/show.ejs', { listing });
};

module.exports.createListing = async (req, res, next) => {
    const newListing = new Listing(req.body.listing);
    console.log( "THIS IS : ", newListing);
    newListing.owner = req.user._id;
    await newListing.save();
    req.flash("success", "New Listing Created!");
    res.redirect('/listings');
};

module.exports.renderEditForm = async (req, res) => {
    const id = req.params.id;
    const listing = await Listing.findById(id);
    res.render('listings/edit.ejs', { listing });
};

module.exports.updateListing = async (req, res) => {
    const id = req.params.id;
    await Listing.findByIdAndUpdate(id, { ...req.body.listing });
    req.flash("success", "Listing Updated!");
    res.redirect('/listings');
};

module.exports.destroyListing = async (req, res) => {
    const id = req.params.id;
    await Listing.findByIdAndDelete(id);
    req.flash("success", "Listing Deleted!");
    res.redirect('/listings');
};