var fs         = require('fs');
var express    = require('express');
var app        = express();
var User       = require('./../../models/user');
var jwt        = require('jsonwebtoken');


// sign with RSA SHA256
var secretKey = fs.readFileSync('./samplekey/private-key.pem');  // get private key
var publicKey = fs.readFileSync('./samplekey/public-key.pem');  // get public key

// API ROUTES ================
var apiRoutes = express.Router();

// POST(http://localhost:8080/api/authenticate)
apiRoutes.post('/authenticate', function(req, res) {

  // find db by posted name
  User.findOne({
    name: req.body.name
  }, function(err, user) {
    if (err) throw err;

    // validation
    if (!user) {
      res.json({
        success: false,
        message: 'Authentication failed. User not found.'
      });
      return;
    }

    if (user.password != req.body.password) {
      res.json({
        success: false,
        message: 'Authentication failed. Wrong password.'
      });
      return;
    }

    // when valid -> create token
    var token = jwt.sign(user, secretKey, {
      algorithm: 'RS256',
      expiresIn: '1h'
    });

    res.json({
      success: true,
      message: 'Authentication successfully finished.',
      token: token
    });
    console.log("token: " + token);

  });

});


// Authentification Filter
apiRoutes.use(function(req, res, next) {

  // get token from body:token or query:token of Http Header:x-access-token
  var token = req.body.token || req.query.token || req.headers['x-access-token'];

  // validate token
  if (!token) {
    return res.status(403).send({
      success: false,
      message: 'No token provided.'
    });
  }

  jwt.verify(token, publicKey, function(err, decoded) {
    if (err) {
      return res.status(403).json({
        success: false,
        message: 'Invalid token'
      });
    }

    // if token valid -> save token to request for use in other routes
    req.decoded = decoded;
    next();
  });

});


// GET(http://localhost:8080/api/)
apiRoutes.get('/', function(req, res) {
  res.json({ message: 'Welcome to API routing'});
});

// GET(http://localhost:8080/api/users)
apiRoutes.get('/users', function(req, res) {
  User.find({}, function(err, users) {
    if (err) throw err;
    res.json(users);
  });
});

module.exports = apiRoutes;
