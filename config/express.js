/**
 * Express configuration
 */

'use strict';

// var express = require('express');
var morgan = require('morgan');
var compression = require('compression');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var errorHandler = require('errorhandler');
var methodOverride = require('method-override');
// var path = require('path');
// var lusca = require('lusca');
// var config = require('./environment');
var passport = require('passport');
// var session = require('express-session');
// var connectMongo = require('connect-mongo');
// var mongoose = require('mongoose');
// var MongoStore = connectMongo(session);

module.exports = function(app) {
    var env = app.get('env');

    app.use(compression());
    app.use(bodyParser.urlencoded({
        extended: false
    }));
    app.use(bodyParser.json());
    app.use(cookieParser());
    app.use(passport.initialize());
    app.use(methodOverride());

    // Persist sessions with mongoStore / sequelizeStore
    // We need to enable sessions for passport-twitter because it's an
    // oauth 1.0 strategy, and Lusca depends on sessions
    // app.use(session({
    //   secret: config.secrets.session,
    //   saveUninitialized: true,
    //   resave: false,
    //   store: new MongoStore({
    //     mongooseConnection: mongoose.connection,
    //     db: 'bitbloq-dev'
    //   })
    // }));

    // Allow CORS
    app.use(function(req, res, next) {
        res.header('Access-Control-Allow-Origin', req.headers.origin);
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
        res.setHeader('Access-Control-Allow-Headers', 'Origin, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, X-Response-Time, X-PINGOTHER, X-CSRF-Token,Authorization');
        res.setHeader('Access-Control-Allow-Credentials', true);
        next();
    });

    var cors = require('cors');

    app.use(cors());

    /**
     * Lusca - express server security
     * https://github.com/krakenjs/lusca
     */
    //   if ('test' !== env) {
    //     app.use(lusca({
    //       csrf: {
    //         angular: true
    //       },
    //       xframe: 'SAMEORIGIN',
    //       hsts: {
    //         maxAge: 31536000, //1 year, in seconds
    //         includeSubDomains: true,
    //         preload: true
    //       },
    //       xssProtection: true
    //     }));
    //   }

    if ('production' === env) {
        app.use(morgan('dev'));
    }

    if ('development' === env) {}

    if ('development' === env || 'test' === env) {
        app.use(morgan('dev'));
        app.use(errorHandler()); // Error handler - has to be last
    }
};