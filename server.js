
// TODO: Find a better way to load different configs in different env
var dbConfig;
try {
    // Look for dev conf for local development
    dbConfig = require('./config/db.dev.conf.js');
} catch(e) {
    try {
        // production conf?
        dbConfig = require('./config/db.conf.js');
    } catch(e) {
        console.log('Startup failed.  No db config file found.');
        return false;
    }
}


var knex = require('knex')({
        client: 'mysql',
        connection: dbConfig
    }), 
    express = require('express'),
    bodyParser = require('body-parser'),
    cookieParser = require('cookie-parser'),
    oauthserver = require('oauth2-server'),

    mysql = require('mysql'),
    session = require('express-session'),
    SessionStore = require('express-mysql-session'),
    
    serveStatic = require('serve-static'),
    expressValidator = require('express-validator'),
    flash = require('connect-flash'),
    swig = require('swig'),
    swigRender = require('./config/swig.conf'),
    passport = require('passport'),
    crypto = require('crypto'),
    Bookshelf = require('bookshelf'),
    messages = require('./util/messages');

var app = express();

Bookshelf.mysqlAuth = Bookshelf(knex);
Bookshelf.mysqlAuth.plugin('registry');

oauth = require('./models/oauth'),

app.use(cookieParser('halsisiHHh445JjO0'));

var sessionStore = new SessionStore(dbConfig);
app.use(session({
    key: 'session_sid',
    secret: 'session_cookie_secret',
    store: sessionStore,
    resave: true,
    saveUninitialized: true
}));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(expressValidator());
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.use(serveStatic('./build/public/'));
//app.use(express.favicon(__dirname + '/public/images/shortcut-icon.png'));
app.use(messages());

// app.engine('html', swigRender);
// app.set('view engine', 'html');


// app.set('views', __dirname + '/views');

require('./util/auth')(passport);
require('./routes')(app, passport);

//API入口需要进行oauth2认证
app.oauth = oauthserver({
  model: oauth, // See below for specification 
  grants: ['password', 'refresh_token'],
  debug: true
});
app.all('/oauth/token', app.oauth.grant());
var apiRouter = require('./routers/api');
var cmsRouter = require('./routers/cms');
app.use('/api/v1', apiRouter);
app.use('/cms', cmsRouter);
app.use('/api', app.oauth.authorise(), apiRouter);
app.use(app.oauth.errorHandler());

app.listen(process.env.PORT || 3000);

console.log('Listening on port 3000');
