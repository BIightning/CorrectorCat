const idValidation = require("../utils/objectidValidation");


/**
 * Express Middleware function for getting the ownerId of an upload from the request header
 * and adding it to the req object.
 * Will send an error response and abort the upload if no valid header is provided.
 * @param  req 
 * @param  res 
 * @param  next 
 */
function uploadOwner(req, res, next) {
    const owner = req.header('x-upload-owner');
    if (!owner)
        return res.status(400).send('Invalid file owner id.');

    let { error } = idValidation(owner);
    if (error)
        return res.status(400).send(error.details[0].message);

    req.ownerId = owner;
    next();
}

module.exports = uploadOwner;