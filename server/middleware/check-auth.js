const jwt = require('jsonwebtoken');
//poner el token en el header
exports.checkAuth = (req, res, next) => {
    try {
        //para quitar el bearer
        console.log("estas dentro del check");
        const token = req.headers.authorization.split(" ")[1];
        const decoded = jwt.verify(token, "secret_this_should_be_longer");
        req.userData = decoded;
        next();
    } catch (error) {
        return res.status(401).json({
            message: "Auth Failed"
        });
    }
};