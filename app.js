'use strict'

var express = require('express'),
    path = require('path'),
    favicon = require('serve-favicon'),
    indexRoute = require('./routes/index'),
    offeringRoute = require('./routes/offering'),
    marketplaceRoute = require('./routes/marketplace'),
    cookieSession = require('cookie-session'),
    ejs = require('ejs'),
    faviconURL = __dirname + '/public/img/favicon.svg',
    publicDir = express.static(__dirname + '/public'),
    viewDir = __dirname + '/views',
    port = (process.env.PORT || 80),
    app = express()

app
   .set('views', viewDir)
   .set('port', port)
   .set('view engine', 'ejs')
   .use(favicon(faviconURL))
   .use(publicDir)
   .use(cookieSession({
        name: 'session',
        keys: ['key1', 'key2']
    }))
   .use('/offering/', offeringRoute)
   .use('/marketplace/', marketplaceRoute)
   .use('/', indexRoute)


module.exports = app