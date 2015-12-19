
var rendering = require('./util/rendering'),
    indexController = require('./controllers/cms/index'),
    loginController = require('./controllers/cms/login');

module.exports = function (app, passport) {

    // Home
    app.get('/', ensureAuthenticated, indexController.home);
    app.get('/home', ensureAuthenticated, indexController.home);

    //users
    app.get('/home', ensureAuthenticated, indexController.home);

    // Auth
    app.get('/register', loginController.registerPage);
    app.post('/register', loginController.registerPost);
    app.get('/login', loginController.loginPage);
    app.post('/login', loginController.checkLogin);
    app.get('/logout', loginController.logout);

    // Auth Middleware
    function ensureAuthenticated(req, res, next) {
        if (req.isAuthenticated()) { return next(); }
        res.redirect('/login');
    }
}
