const mongoose = require('mongoose');
const initData = require('./data.js');
const Listing = require('../models/listings.js');

const MongoURL = "mongodb://127.0.0.1:27017/wanderlust";

main().then(() => {
    console.log(`DB connected!`);
}).catch((err) => {
    console.log(`DB connection error is : ${err}`);
});


async function main() {
    await mongoose.connect(MongoURL);
}

const initDB = async () => {
    await Listing.deleteMany({});
    await Listing.insertMany(initData.data);
    console.log("Data was initiallized");
}

initDB();
