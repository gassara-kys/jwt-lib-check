var fs = require('fs');
var jwt = require('jsonwebtoken');

// sign with RSA SHA256
var secretKey = fs.readFileSync('../samplekey/private-key.pem');  // get private key
var publicKey = fs.readFileSync('../samplekey/public-key.pem');  // get public key

var sampleJson = {
  foo: 'bar'
}

// create alg=RS256 JWT
jwt.sign(sampleJson, secretKey, { algorithm: 'RS256' }, function(err, token) {
  console.log('RS256: \n' + token);
});

// create alg=HS256 JWT
jwt.sign(sampleJson, publicKey, { algorithm: 'HS256' }, function(err, token) {
  console.log('HS256: \n' + token);
});

// create alg=none JWT
jwt.sign(sampleJson, publicKey, { algorithm: 'none' }, function(err, token) {
  console.log('none: \n' + token);
});
