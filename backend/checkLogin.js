const jwt = require("jsonwebtoken");

function checkLogin(req, res, next) {
    const token = req.headers.authorization;

    try {
        const userID = jwt.verify(token, process.env.KEY);
        req.user = userID;
        next();
    } catch (e) {
        res.json({ msg: e, code: 400 })
    }
}

module.exports = checkLogin;