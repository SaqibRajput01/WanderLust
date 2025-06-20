class ExpressError extends Error {
    constructor(message, statusCode) {
        super();
        this.message = message;
        this.statusCode = statusCode;
    }
}

module.exports = ExpressError;
// This class extends the built-in Error class in JavaScript. It takes a message and a status code as parameters and sets them as properties of the instance. This is useful for creating custom error objects that can be used in Express applications to handle errors more effectively.