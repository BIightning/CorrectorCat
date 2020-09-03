module.exports = function(err, req, res, next) {
    console.trace('\n' + '\x1b[31m%s\x1b[0m' + '\n', err);
    return res.status(500).send('Sorry, something went wrong. Please try again later!');
}