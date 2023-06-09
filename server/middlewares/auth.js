const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();
// 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

const checkUserRole = (allowedRoles) => {
    return (req, res, next) => {
        // This is to extract the "Bearer" string and get olny the token
        const token = req.headers.authorization.split(' ')[1];        

        jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
            if (err) {
                return res.status(401).json({message: 'Invalid token'});
            }

            const userRole = decoded.role;

            if (!allowedRoles.includes(userRole)) {
                return res.status(403).json({message: 'Access denied'})
            }

            // If the user role is allowed, proceed to the next middleware or route
            next();
        });
    }
}

module.exports = {
    checkUserRole
};