const axios = require('axios');
const { resolve } = require('path');
const url = require('url');

/**
 * Checks if an external (api-)url is available
 * @param {string} urlToCheck The URL whose availability we want to check
 * @callback availabityCallback returns true if url is available and false if not
 */
async function checkAvailability(urlToCheck) {
    return await axios({ method: 'HEAD', url: urlToCheck })
}
module.exports.checkAvailability = checkAvailability;