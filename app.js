var express = require('express');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var routes = require('./routes/index');
var users = require('./routes/users');
var app = express();
var errorhandler = require("errorhandler");
var vain = require("vain");

app.set('view cache', false);
app.set('views', path.join(__dirname, 'views'));


app.use(logger('dev'));
app.use(express.static(path.join(__dirname, 'public')));

app.engine('html', vain.renderFile);
app.use('/', vain.router(app.get('views')));

/// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// error handlers
app.use(errorhandler());

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

// Snippets
vain.registerSnippet("page-title", function($, params, finished) {
  $(this).text("Welcome to vain");
  finished();
});


module.exports = app;
