function isAgent(req, res, next) {
    if (req.user.role === 'agent') {
        next();
    } else {
        res.status(403).json({error: 'Access denied'});
    }
}

module.exports = {
    isAgent
};