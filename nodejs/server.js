// =======================
// get instance we need
// =======================
var express    = require('express');
var app        = express();
var bodyParser = require('body-parser');
var morgan     = require('morgan');
var mongoose   = require('mongoose');

var config     = require('./config');
var User       = require('./app/models/user');

// =======================
// configuration
// =======================
// server setting
var port = process.env.PORT || 8080;

// connect databse
mongoose.connect(config.database);

// config for body-parser
app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());

// log request
app.use(morgan('dev'));

// =======================
// routes
// =======================
app.get('/', function(req, res) {
  res.send('Hello! The API is at http://localhost:' + port + '/api');
});

// for create test user to db
app.get('/setup', function(req, res) {
  var demo = new User({
    name: 'demouser',
    password: 'password',   // TODO: encrypt password
    admin: true
  });

  demo.save(function(err) {
    if (err) throw err;

    console.log('User saved successfully');
    res.json({ success: true});
  });

});


// API ROUTES ================
var apiRoutes = require('./app/api/user/index');

// apply the routes to our application(prefix /api)
app.use('/api', apiRoutes);






// =======================
// start the server
// =======================
app.listen(port);
console.log('started http://localhost:' + port + '/');
