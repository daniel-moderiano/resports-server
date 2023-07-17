"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
// Replace the inbuilt express error handler by defining a middleware func that accepts the err object in addition to the usual middleware params
const errorHandler = (err, req, res, next) => {
    // Check for existing error status codes. If none exist, set to 500.
    let statusCode;
    if (!res.statusCode) {
        statusCode = 500;
    }
    else {
        statusCode = res.statusCode;
    }
    res.status(statusCode);
    // Return JSON instead of the default HTML error template by Express
    res.json({
        errorMsg: err.message,
        stack: process.env.NODE_ENV === "production" ? undefined : err.stack, // Do not add stack for production apps
    });
};
exports.errorHandler = errorHandler;
