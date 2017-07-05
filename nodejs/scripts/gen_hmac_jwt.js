var fs = require('fs');
var jwt = require('jsonwebtoken');

// sign with RSA SHA256
var cert = fs.readFileSync('../samplekey/public-key.pem');  // get public key

jwt.sign({ foo: 'bar' }, cert, { algorithm: 'HS256' }, function(err, token) {
  console.log(token);
});
