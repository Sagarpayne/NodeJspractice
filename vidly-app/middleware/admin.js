const jwt = require('jsonwebtoken');
const config = require('config');


module.exports = function admin(req, res, next) {

    try {

        if (!req.user.isAdmin)
            return res.status(403).send((req.user.isAdmin))

        next();

    }
    catch (ex) {
        res.status(400).send('Access denied')
    }
}
