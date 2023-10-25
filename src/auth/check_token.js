"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var jwt = require('jsonwebtoken');
var checkToken = function (req, res, next) {
    var secret = process.env.SECRET;
    if (req.originalUrl.startsWith('/api/payment/seller/add')) {
        next();
        return;
    }
    // Express headers are auto converted to lowercase
    var token = req.headers.authorization;
    if (!token)
        return res.status(401).json({
            success: false,
            message: 'Auth token is not supplied',
        });
    if (token.startsWith('Bearer ')) {
        // Remove Bearer from string
        token = token.slice(7, token.length);
    }
    jwt.verify(token, secret, function (err, decoded) {
        if (err) {
            return res.status(401).json({
                success: false,
                message: 'Token is not valid',
            });
        }
        //req.decoded = decoded;
        next();
    });
};
exports.default = checkToken;
