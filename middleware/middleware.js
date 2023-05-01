let middlewareObject = {}

middlewareObject.isNotLoggedIn = (req, res, next) => {

    if (!req.isAuthenticated()) {
        return next()
    }
    res.redirect("/")
}
module.exports = middlewareObject
